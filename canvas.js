export class CanvasAPI {
    #ctx;
    #stampImage;

    constructor(element) {
        this.#ctx = element.getContext("2d");
        this.#ctx.canvas.width = 800;
        this.#ctx.canvas.height = 600;
        this.#ctx.lineCap = "round";

        this.#stampImage = new Image();
        this.#stampImage.src = 'https://ih1.redbubble.net/image.5065733096.9927/st,small,845x845-pad,1000x1000,f8f8f8.u2.jpg';

        this.#stampImage.onload = () => {
            console.log('Stamp image loaded');
        };

        this.#stampImage.onerror = () => {
            console.error('Failed to load stamp image');
        };
    }

    draw(path) {
        if (path.length === 0) {
            return
        }

        this.#ctx.beginPath();
        const [first] = path;
        this.#ctx.moveTo(first.x, first.y);

        path.forEach(({ x, y, color, width }) => {
            this.#ctx.lineWidth = width;
            this.#ctx.strokeStyle = color;
            this.#ctx.lineTo(x, y)
        })

        this.#ctx.stroke()
        this.#ctx.closePath();
    }

    drawLine(x1, y1, x2, y2, color, width) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(x1, y1);
        this.#ctx.lineTo(x2, y2);
        this.#ctx.lineWidth = width;
        this.#ctx.strokeStyle = color;
        this.#ctx.stroke();
    }

    drawStamp(x, y, size) {
        if (this.#stampImage.complete) {
            this.#ctx.drawImage(this.#stampImage, x - size / 2, y - size / 2, size, size);
        }
    }

    clean() {
        this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
    }

    get element() {
        return this.#ctx.canvas;
    }


}
