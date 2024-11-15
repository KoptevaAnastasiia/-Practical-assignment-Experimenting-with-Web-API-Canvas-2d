const IDLE = 'idle';
export const DRAW = 'draw';
export const ERASE = 'erase';
export const STAMP = 'stamp';

export class Paint {
    #canvas;
    #pointerState = IDLE;
    #mode = DRAW;
    #color_P = '#000';
    #size = 7;


    #stampSize = 50;
    #path = [];

    constructor(canvas) {
        this.#canvas = canvas;

        this.#canvas.element.addEventListener('mousemove', (event) => {
            const coordinates = this.#recalculateCoordinates(event);
            switch(this.#pointerState) {
                case DRAW:

                    if (this.#path.length > 0) {
                        const lastPoint = this.#path[this.#path.length - 1];
                        this.#canvas.drawLine(lastPoint.x, lastPoint.y, coordinates.x, coordinates.y, this.#color_P, this.#size);
                    }


                    this.#path.push({
                        x: coordinates.x,
                        y: coordinates.y,
                        color: this.#color_P,
                        width: this.#size,
                    });
                    this.#canvas.draw(this.#path);
                    break
                case ERASE:
                    this.#canvas.draw([{ x: coordinates.x, y: coordinates.y, color: '#fff', width: 50 }]);
                    break;
                case STAMP:
                    this.#canvas.drawStamp(coordinates.x, coordinates.y, this.#stampSize); // Виклик методу для штампа
                    break;
            }
        })

        this.#canvas.element.addEventListener('mousedown', (event) => {
            this.#pointerState = this.#mode;
        });

        this.#canvas.element.addEventListener('mouseup', (event) => {
            this.#pointerState = IDLE;

            if (this.#path.length > 0) {
                this.#canvas.draw(this.#path);
                this.#path = [];
            }
        });
    }

    setMode(mode) {
        this.#mode = mode;
    }

    setColor(color) {
        this.#color_P = color;
    }

    setBrushSize(size) {
        this.#size = size;
    }

    setStampSize(size) {
        this.#stampSize = size;
    }

    #recalculateCoordinates({ clientX, clientY }) {
        return {
            x: clientX - this.#canvas.element.offsetLeft,
            y: clientY - this.#canvas.element.offsetTop
        };
    }
}
