// http://docs.xtermjs.org/module-xterm_src_xterm.html

declare module 'xterm' {
  class Terminal {
    /**
     * Opens the terminal within an element.
     */
    open(parent: HTMLElement);

    /**
     * Destroys the terminal.
     */
    destroy();

    /**
     * Fit terminal columns and rows to the dimensions of its DOM element.
     */
    fit();

    proposeGeometry();

    /**
     * Resizes the terminal.
     *
     * @param {number} x The number of columns to resize to.
     * @param {number} y The number of rows to resize to.
     */
    resize(x: number, y:number);

    /**
     * Writes text to the terminal.
     * @param {string} text The text to write to the terminal.
     */
    write(data: string);


    /**
     * Writes text to the terminal, followed by a break line character (\n).
     * @param {string} text The text to write to the terminal.
     */
    writeln(data: string);
  }
  export = Terminal;
}