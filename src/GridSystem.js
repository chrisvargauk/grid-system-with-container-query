import util from './util';
import './index.scss';

class GridSystem {
  constructor( listBreakpoint, dGridWrapper ) {
    this.util     = util;
    this.listDCol = [];
    this.listCont = [];
    this.dGridWrapper = document.body;

    this.config = {
      listBreakpoint: listBreakpoint || {
        default: {
          'col-4-4': 100,
          'col-3-4': 75,
          'col-2-4': 50,
          'col-1-4': 25,
        },

        600: {
          'col-4-4': 100,
          'col-3-4': 100,
          'col-2-4': 50,
          'col-1-4': 50,
        },

        400: {
          'col-4-4': 100,
          'col-3-4': 100,
          'col-2-4': 100,
          'col-1-4': 100,
        },
      }
    };

    // Index Often used values
    this.indexed = this.createIndex();

    window.addEventListener('resize', this.handlerResize.bind( this ));

    this.regGrid( dGridWrapper );
    this.handlerResize();
  }

  /*
    Generate a sorted rapid access object of often used values from the provided config
    E.g.: {
      "listDColName":          ["col-4-4", "col-3-4", "col-2-4", "col-1-4"],
      "listBreakpointWidth":  [600, 400],
      "isActiveGrid":         true
    }
  * */
  createIndex() {
    const indexed = {};

    if (!(this.config.listBreakpoint instanceof Array)) {
      // Use any breakpoint the Dev has defined to extract the Column Widths
      const someBreakpointName = Object.keys(this.config.listBreakpoint)[0];

      const someBreakpoint = this.config.listBreakpoint[ someBreakpointName ];
      indexed.listDColName = Object.keys(someBreakpoint);
      indexed.listBreakpointWidth = Object.keys(this.config.listBreakpoint)
        .map(item => parseInt(item))
        .filter(item => !isNaN(item))
        .sort((a, b) => b - a);

      indexed.isActiveGrid = true;
    } else {
      indexed.listDColName = this.config.listBreakpoint;
      indexed.listBreakpointWidth = this.config.listBreakpoint
        .map(item => parseInt(item))
        .filter(item => !isNaN(item))
        .sort((a, b) => b - a);

      indexed.isActiveGrid = false;
    }

    return indexed;
  }

  regGrid( dGridWrapper = document.body ) {
    this.dGridWrapper = dGridWrapper;

    // Collect list of Container DOM Elements
    // Note: Container DOM Elements have a "breakpoint" attribute set on every resize event
    //       e.g. <div class="my-class cont" breakpoint="default">..</div>
    this.listCont = [];
    const listNodeDCont = dGridWrapper.querySelectorAll(".cont");
    for (let indexListNodeDCont = 0; indexListNodeDCont < listNodeDCont.length; indexListNodeDCont++) {
      const dCont = listNodeDCont[ indexListNodeDCont ];
      this.listCont.push( dCont );
    }

    if (!this.indexed.isActiveGrid) return;

    // Add Grid as a Container DOM Element if any
    const dGrid = dGridWrapper.querySelector(".grid");
    if (dGrid !== null) {
      this.listCont.push( dGrid );
    }

    // Generate a list of Column DOM Elements in the Grid
    this.listDCol = this.getListDCol( dGridWrapper );
  }

  getListDCol( dGridWrapper ) {
    const dGrid = dGridWrapper.querySelector('.grid') || document.body;

    const listDCol = [];
    // Find the CSS class that identifies the defined breakpoint
    dGrid.querySelectorAll(".grid > [class*='col-']").forEach(dCol => {
      // Filter off Columns inside nested grids, process Columns one layer at a time
      if (dCol.parentElement !== dGrid) {
        return;
      }

      // Note: No reg exp cause its slow.
      const typeCol = Array.prototype.filter.call(dCol.classList,
        className => this.indexed.listDColName.includes(className)
      )[0];

      listDCol.push({
        domElement: dCol,
        type: typeCol,
      });
    });

    return listDCol;
  }

  handlerResize() {
    // Set "breakpoint" attribute on Containers
    for (let indexListCont = 0; indexListCont < this.listCont.length; indexListCont++) {
      const cont = this.listCont[ indexListCont ];
      const widthParent = this.util.screen.getWidthDomElement( cont.parentElement );
      const breakpoint = this.getMatchingBreakpoint( widthParent);

      cont.setAttribute('breakpoint', breakpoint.width);
    }

    if (!this.indexed.isActiveGrid) return;

    const listRow = this.categoriseColsByRow();
    this.calcColumnWith( listRow );
  }

  categoriseColsByRow() {
    let withTotal         = 0;
    let listDColInSameRow = [];
    let listRow           = [];
    for (let indexlistDCol = 0; indexlistDCol < this.listDCol.length; indexlistDCol++) {
      const col = this.listDCol[ indexlistDCol ];
      const dCol = col.domElement;
      const dParent = dCol.parentElement;
      const widthParent = this.util.screen.getWidthDomElement( dParent );
      const breakpoint = this.getMatchingBreakpoint( widthParent);

      // Categorise Cols by Row
      withTotal += breakpoint.listObjCol[ col.type ];
      listDColInSameRow.push( col );
      if (withTotal === 100 ||
         indexlistDCol === this.listDCol.length - 1
      ) {
        listRow.push( listDColInSameRow );
        withTotal = 0;
        listDColInSameRow = [];
      }

      // Resetting the height of every Column before setting it again
      // Note: Without this step, Columns can only grow
      dCol.style.height = 'auto';
    }

    return listRow;
  }

  calcColumnWith( listRow ) {
    const widthParent = this.util.screen.getWidthDomElement( this.dGridWrapper );
    const breakpoint = this.getMatchingBreakpoint( widthParent);
    const gutterPercentage  = this.calcGutter( breakpoint );

    // Iterate over all the Row in the Grid
    for (let indexListRow = 0; indexListRow < listRow.length; indexListRow++) {
      const row = listRow[indexListRow];
      const listCol = row;

      // Iterate over all the Columns in the given Row and set with (minus gutter if any)
      for (let indexListCol = 0; indexListCol < listCol.length; indexListCol++) {
        const col = listCol[ indexListCol ];

        let withPercentage      = breakpoint.listObjCol[ col.type ];
        let marginLeft          = 0;
        let marginRight         = 0;

        // First Column in the Row
        if (indexListCol === 0) {
          withPercentage -= 2 * gutterPercentage;
          marginLeft = 2 * gutterPercentage;

          if (!(indexListCol === listCol.length -1)) {
            withPercentage -= 1 * gutterPercentage;
            marginRight = 1 * gutterPercentage;
          }
        }

        // Last Column in the Row
        if (indexListCol === listCol.length -1) {
          withPercentage -= 2 * gutterPercentage;
          marginRight = 2 * gutterPercentage;

          if (!(indexListCol === 0)) {
            withPercentage -= 1 * gutterPercentage;
            marginLeft = 1 * gutterPercentage;
          }
        }

        // One of the Columns in the middle
        if ( !(indexListCol === 0) && !(indexListCol === listCol.length -1)) {
          withPercentage -= 2 * gutterPercentage;
          marginLeft = 1 * gutterPercentage;
          marginRight = 1 * gutterPercentage;
        }

        col.domElement.style.width = withPercentage+'%';
        col.domElement.style.marginLeft = marginLeft+'%';
        col.domElement.style.marginRight = marginRight+'%';

        if (indexListRow === 0) {
          col.domElement.style.marginTop = (2*gutterPercentage)+'%';
        } else {
          col.domElement.style.marginTop = gutterPercentage+'%';
        }

        col.domElement.style.marginBottom = gutterPercentage+'%';
      }

      // Iterate over all the Columns in the given Row and find the tallest one
      let heightMax = 0;
      for (let indexListDCol = 0; indexListDCol < listCol.length; indexListDCol++) {
        const dCol = listCol[ indexListDCol ].domElement;

        if (heightMax < dCol.offsetHeight) {
          heightMax = dCol.offsetHeight;
        }
      }

      // Iterate over all the Columns in the given Row and
      // adjust all Column Heights to the tallest Column
      for (let indexListDCol = 0; indexListDCol < listCol.length; indexListDCol++) {
        const dCol = listCol[ indexListDCol ].domElement;
        dCol.style.height = heightMax+1+'px';
      }
    }
  }

  calcGutter( breakpoint ) {
    const gutter = breakpoint.listObjCol.gutter || '0%';
    let gutterPercentage = 0;
    if ( typeof gutter === 'string' && gutter.indexOf('%') !== -1 ) {
      gutterPercentage = gutter.split('%').join('') / 2;

    } else if ( typeof gutter === 'string' && gutter.indexOf('px') !== -1 ) {
      let gutterPx = parseFloat( gutter.split('px').join('') ) / 2;
      // gutterPercentage = gutterPx / (this.dGridWrapper.offsetWidth / 100);
      gutterPercentage = gutterPx / (this.dGridWrapper.offsetWidth / 100);

    } else {
      throw('ERROR: GridSystem: "'+gutter+'" is an unknown gutter format - in configuration. Expected formats: "10px", "0.5%"');
    }

    return gutterPercentage;
  }

  getMatchingBreakpoint( widthParent ) {
    let breakpointDetailMatching;
    for (let indexListWidth=0; indexListWidth<this.indexed.listBreakpointWidth.length; indexListWidth++) {
      const breakpointDetail = this.indexed.listBreakpointWidth[ indexListWidth ];

      if (widthParent < breakpointDetail) {
        breakpointDetailMatching = breakpointDetail;
      } else {
        break;
      }
    }

    return {
      listObjCol: breakpointDetailMatching ?
        this.config.listBreakpoint[ breakpointDetailMatching ] : this.config.listBreakpoint.default,
      width: breakpointDetailMatching || 'default',
    };
  }
}

export default GridSystem;
