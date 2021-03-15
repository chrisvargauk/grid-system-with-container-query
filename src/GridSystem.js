import util from './util';
import './index.scss';

class GridSystem {
  constructor( listBreakpoint, domSection ) {
    this.util     = util;
    this.listDCol  = [];
    this.listCont = [];

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

    this.regGrid( domSection );
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

  regGrid( domSection = document ) {
    // Collect list of Container DOM Elements
    // Note: Container DOM Elements have a "breakpoint" attribute set on every resize event
    //       e.g. <div class="my-class cont" breakpoint="default">..</div>
    this.listCont = [];
    const listNodeDCont = domSection.querySelectorAll(".cont");
    for (let indexListNodeDCont = 0; indexListNodeDCont < listNodeDCont.length; indexListNodeDCont++) {
      const dCont = listNodeDCont[ indexListNodeDCont ];
      this.listCont.push( dCont );
    }

    if (!this.indexed.isActiveGrid) return;

    // Add Grid as a Container DOM Element if any
    const dGrid = domSection.querySelector(".grid");
    if (dGrid !== null) {
      this.listCont.push( dGrid );
    }

    // Generate a list of Column DOM Elements in the Grid
    this.listDCol = this.getListDCol( domSection );
  }

  getListDCol( domSection ) {
    const dGrid = domSection.querySelector('.grid') || domSection.body;

    const listDCol = [];
    // Find the CSS class that identifies the defined breakpoint
    dGrid.querySelectorAll(".grid > [class*='col-']").forEach(dCol => {
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

    // Resize Cols in Grid
    const listObjCoordYListDCol = {};
    for (let indexlistDCol = 0; indexlistDCol < this.listDCol.length; indexlistDCol++) {
      const col = this.listDCol[ indexlistDCol ];
      const dCol = col.domElement;
      const dParent = dCol.parentElement;
      const widthParent = this.util.screen.getWidthDomElement( dParent );
      const breakpoint = this.getMatchingBreakpoint( widthParent);

      dCol.style.width = breakpoint.listObjCol[col.type]+'%';

      // Categorise Cols by their Y Coordinate, hence we categorise them by Row
      const coordYDCol = Math.round(dCol.getBoundingClientRect().top);
      const coordYListDCol = listObjCoordYListDCol[ coordYDCol ] = listObjCoordYListDCol[ coordYDCol ] || [];
      coordYListDCol.push( dCol );
      dCol.style.height = 'auto';
    }

    this.adjustColHeightAll( listObjCoordYListDCol );
  }

  adjustColHeightAll( listObjCoordYListDCol ) {
    // Iterate over all the Row in the Grid
    const listCoordY = Object.keys( listObjCoordYListDCol );
    for (let indexListCoordY = 0; indexListCoordY < listCoordY.length; indexListCoordY++) {
      const coordY = listCoordY[ indexListCoordY ];
      const listDCol = listObjCoordYListDCol[ coordY ];

      // Iterate over all the Columns in the given Row and find the tallest one
      let heightMax = 0;
      for (let indexListDCol = 0; indexListDCol < listDCol.length; indexListDCol++) {
        const dCol = listDCol[ indexListDCol ];

        if (heightMax < dCol.offsetHeight) {
          heightMax = dCol.offsetHeight;
        }
      }

      // Iterate over all the Columns in the given Row and
      // adjust all Column Heights to the tallest Column
      for (let indexListDCol = 0; indexListDCol < listDCol.length; indexListDCol++) {
        const dCol = listDCol[ indexListDCol ];
        dCol.style.height = heightMax+'px';
      }
    }
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
