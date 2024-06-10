export const zodiaco = (nacimiento: string) => {
    const [day, month, year] = nacimiento.split('/')

    let dia = typeof day === 'string' ? Number(day) : day
    let mes = typeof month === 'string' ? Number(month) : month

    const signos = [
        {
            signo: 'Capricornio',
            detalle:
                'Personas serias, disciplinadas y prácticas. Conocidos por su ética de trabajo y su determinación. Son ambiciosos y suelen ser conservadores en su enfoque de la vida.',
        },
        {
            signo: 'Acuario',
            detalle:
                'Innovadores, excéntricos y a menudo muy creativos. Amistosos y humanitarios, pero también pueden ser distantes y desapegados emocionalmente.',
        },
        {
            signo: 'Piscis',
            detalle:
                'Empáticos, artísticos y a menudo muy intuitivos. Soñadores y a veces un poco evasivos, con una fuerte inclinación hacia lo espiritual o lo místico.',
        },
        {
            signo: 'Aries',
            detalle:
                'Energéticos, asertivos y a menudo impulsados por el deseo de aventura y competencia. Conocidos por su entusiasmo y confianza, pero también pueden ser impulsivos y pacientes.',
        },
        {
            signo: 'Tauro',
            detalle:
                'Prácticos, decididos y con una fuerte necesidad de seguridad y comodidad. Valoran la estabilidad y el placer sensorial, pero pueden ser obstinados y posesivos.',
        },
        {
            signo: 'Géminis',
            detalle:
                'Comunicativos, ingeniosos y muy curiosos. Versátiles y sociables, pero también pueden ser inconsistentes y nerviosos.',
        },
        {
            signo: 'Cáncer',
            detalle:
                'Emocionales, empáticos y muy ligados a la familia y al hogar. Protectores y cariñosos, pero pueden ser demasiado sensibles y melancólicos.',
        },
        {
            signo: 'Leo',
            detalle:
                'Dramáticos, creativos y extrovertidos. Líderes naturales y tienen un gran sentido del orgullo y la dignidad, pero pueden ser arrogantes y demasiado dominantes.',
        },
        {
            signo: 'Virgo',
            detalle:
                'Metódicos, atentos a los detalles y muy prácticos. Trabajadores y analíticos, pero pueden ser críticos y perfeccionistas hasta el extremo.',
        },
        {
            signo: 'Libra',
            detalle:
                'Equilibrados, justos y muy sociales. Fuerte sentido de la justicia y la equidad, y son buenos mediadores, pero pueden evitar el conflicto y ser indecisos.',
        },
        {
            signo: 'Escorpio',
            detalle:
                'Intensos, apasionados y con una gran fuerza de voluntad. Conocidos por su profundidad emocional y su capacidad para transformarse, pero pueden ser muy celosos y manipuladores.',
        },
        {
            signo: 'Sagitario',
            detalle:
                'Optimistas, amantes de la libertad y con un gran sentido del humor. Aman la aventura y el aprendizaje, pero pueden ser irresponsables y descuidados con los detalles.',
        },
    ]

    const ultimoDiaSigno = [19, 18, 20, 19, 20, 20, 22, 22, 21, 22, 21, 21]

    // Ajustar el índice para obtener el signo zodiacal correcto
    const indice = (mes - 1 + (dia > ultimoDiaSigno[mes - 1] ? 1 : 0)) % 12
    return signos[indice]
}
