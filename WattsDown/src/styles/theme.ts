const palette = {
    blue: '#009FFF',
    white: '#FFF',
    black: '#000',
    green: "#4caf50",
    grey: "#607d8b",
    red: "#d32f2f"
}

export const theme = {
    colors: {
        primary: palette.blue,
        success: palette.green,
        danger: palette.red,
        dark: palette.black,
        light: palette.white,
        grey: palette.grey
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 40
    },
    textVariants: {
        header: {
            fontFamily: 'Raleway',
            fontSize: 36,
            fontWeight: 'bold',
        },
        body: {
            fontFamily: 'Merriweather',
            fontSize: 16,
        },
    },
    breakpoints: {
        smallPhone: 0,
        phone: 321,
        tablet: 768
    }
}

export const darkTheme = {

}
