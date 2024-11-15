export class CanvasAPI {
    #ctx;

    constructor(element) {
        this.#ctx = element.getContext("2d");
        this.#ctx.canvas.width = 800;
        this.#ctx.canvas.height = 600;
        this.#ctx.lineCap = "round";
    }

    draw(path) {
        if (path.length === 0) {
            return
        }

        this.#ctx.beginPath();
        const [first] = path;
        this.#ctx.moveTo(first.x, first.y);

        path.forEach(({x, y, color, width}) => {
            this.#ctx.lineWidth = width;
            this.#ctx.strokeStyle = color;
            this.#ctx.lineTo(x, y)
        })

        this.#ctx.stroke()
        this.#ctx.closePath();
    }

    clean() {
        this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
    }

    get element() {
        return this.#ctx.canvas;
    }


}
