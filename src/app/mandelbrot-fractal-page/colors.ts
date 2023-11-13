class ColorPalette {
    lagrange([X1, Y1]: number[], [X2, Y2]: number[], x: number): number {
        return (((Y1 * (x - X2)) / (X1 - X2)) + ((Y2 * (x - X1)) / (X2 - X1)));
    }

    makeRGB(r: number | number[], g: number | number[], b: number | number[], k: number): number[] {
        const calculate = (pair: number[]): number => this.lagrange(pair, [pair[0], pair[1]], k);
        if (typeof r !== 'number') r = calculate(r as number[]);
        if (typeof g !== 'number') g = calculate(g as number[]);
        if (typeof b !== 'number') b = calculate(b as number[]);

        return [r as number, g as number, b as number];
    }

    palette(size: number = 250): number[][] {
        const range: number = size / 6;
        const colors: number[][] = [];
        let c: number[];

        for (let k = 0; k < size; k++) {
            if (k <= range)
                c = this.makeRGB(255, 0, 0, k);
            else if (k <= range * 2)
                c = this.makeRGB(255, 255, 0, k);
            else if (k <= range * 3)
                c = this.makeRGB(0, 255, 0, k);
            else if (k <= range * 4)
                c = this.makeRGB(0, 255, 255, k);
            else if (k <= range * 5)
                c = this.makeRGB(0, 0, 255, k);
            else
                c = this.makeRGB(255, 0, 255, k);

            colors.push(c);
        }
        return colors;
    }
}

