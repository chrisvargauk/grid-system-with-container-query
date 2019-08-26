import util from './util';
import './index.scss';

class GridSystem {
  constructor( listBreakpoint ) {
    this.util     = util;
    this.listCol  = [];
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

    this.hook();
    this.handlerResize();
  }

  createIndex() {
    const indexed = {};

    if (!(this.config.listBreakpoint instanceof Array)) {
      // Use any breakpoint that the Dev defines to extract the breakpoints
      const someBreakpointName = Object.keys(this.config.listBreakpoint)[0];

      const someBreakpoint = this.config.listBreakpoint[ someBreakpointName ];
      indexed.listColName = Object.keys(someBreakpoint);
      indexed.listBreakpointWidth = Object.keys(this.config.listBreakpoint)
        .map(item => parseInt(item))
        .filter(item => !isNaN(item))
        .sort((a, b) => b - a);

      indexed.isActiveGrid = true;
    } else {
      indexed.listColName = this.config.listBreakpoint;
      indexed.listBreakpointWidth = this.config.listBreakpoint
        .map(item => parseInt(item))
        .filter(item => !isNaN(item))
        .sort((a, b) => b - a);

      indexed.isActiveGrid = false;
    }

    return indexed;
  }

  hook() {
    this.listCont = document.querySelectorAll(".cont");

    if (!this.indexed.isActiveGrid) return;
    this.listCol = this.hookCol();
  }

  hookCol() {
    const dGrid = document.querySelector('.grid') || document.body;

    const listCol = [];
    dGrid.querySelectorAll("[class*='col-']").forEach(dCol => {
      // Find the css class that identifies the desired breakpoint
      // Note: No reg exp cause its slow.
      const typeCol = Array.prototype.filter.call(dCol.classList,
        className => this.indexed.listColName.includes(className)
      )[0];

      listCol.push({
        domElement: dCol,
        type: typeCol,
      });
    });

    return listCol;
  }

  handlerResize() {
    // Resize Containers
    for (let indexListCont = 0; indexListCont < this.listCont.length; indexListCont++) {
      const cont = this.listCont[ indexListCont ];
      const widthParent = this.util.screen.getWidthDomElement( cont.parentElement );
      const breakpoint = this.getMatchingBreakpoint( widthParent);

      cont.setAttribute('breakpoint', breakpoint.width);
    }

    if (!this.indexed.isActiveGrid) return;

    // Resize Cols in Grid
    for (let indexListCol = 0; indexListCol < this.listCol.length; indexListCol++) {
      const col = this.listCol[ indexListCol ];
      const dCol = col.domElement;
      const dParent = dCol.parentElement;
      const widthParent = this.util.screen.getWidthDomElement( dParent );
      const breakpoint = this.getMatchingBreakpoint( widthParent);

      dCol.style.width = breakpoint.listObjCol[col.type]+'%';
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
