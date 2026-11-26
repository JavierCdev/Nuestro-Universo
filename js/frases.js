// Frases del universo. Cada línea es una estrella:
//   ["Título"]                  usa el mensaje genérico
//   ["Título", "Mensaje"]       mensaje propio
//   ["Título", "Mensaje", "🌙"]  mensaje y emoji propios
// También se pueden editar desde la página abriéndola con #editar al final del link.

export const defaultMessage = t => `Eres una parte preciosa de mi universo. «${t}» es uno de esos detalles que hacen que te admire y te quiera cada día.`;

export const rawMessages = [
  ["Tu sonrisa", "Hay sonrisas que se ven, y la tuya se siente. Basta con que aparezca para que el día me parezca más liviano."],
  ["Tu mirada", "Me pierdo en tu mirada cada vez que me detengo a verla. Dice tanto sin decir nada."],
  ["Tu risa", "Tu risa es mi sonido favorito. Si pudiera guardar uno solo para siempre, sería ese."],
  ["Tu voz", "Tu voz me calma y me emociona al mismo tiempo. Podría escucharte hablar durante horas sin cansarme."],
  ["Tu forma de caminar", "Hasta tu manera de caminar me parece especial: segura, tuya, inconfundible. Te reconocería entre mil."],
  ["Tus manos", "Tus manos tienen la medida justa de ternura y de fuerza. Cuando tomo las tuyas, todo se acomoda."],
  ["Tu cabello", "Me encanta cómo se mueve cuando ríes y cómo cae cuando no te das cuenta de que te miro. Es parte de tu encanto."],
  ["Tu olor", "Tu olor se queda conmigo cuando te vas. Me basta recordarlo para sentirte cerca."],
  ["Tus abrazos", "En tus abrazos el mundo se detiene un momento. Son mi lugar favorito para descansar."],
  ["Tus besos", "Tus besos me hacen olvidar todo lo demás. Siempre me saben a poco y, a la vez, a hogar."],
  ["Tus caricias", "Tus caricias son suaves, pero llegan muy hondo. Me recuerdan que a tu lado puedo bajar la guardia."],
  ["Tu estilo", "Tienes un estilo que no copia a nadie. Lo que eliges se vuelve tuyo desde el momento en que te lo pones."],
  ["Tu elegancia natural", "No te esfuerzas por ser elegante, simplemente lo eres. Se nota en cómo te mueves y en cómo tratas a la gente."],
  ["Tu manera de bailar", "Cuando bailas, la alegría se te nota en todo el cuerpo. Dan ganas de seguirte el paso aunque uno no sepa."],
  ["Tu manera de cantar", "Cantes bien o cantes bajito, me encanta escucharte. Cuando lo haces estás tan a gusto que me contagias."],
  ["Tu forma de vestir", "Me encanta cómo combinas las cosas y, sobre todo, cómo te ves cuando estás cómoda contigo misma. Ese es tu mejor look."],
  ["Tus pequeñas manías", "Tus manías son lo que más me enternece. Son tan tuyas que no las cambiaría por nada del mundo."],
  ["Tu energía", "Tu energía se siente apenas llegas. Haces que cualquier lugar se sienta más vivo."],
  ["Tu presencia", "Hay personas que ocupan un lugar; tú lo llenas. Con solo estar, lo cambias todo para bien."],
  ["Tu luz", "Eres de esas personas que iluminan sin proponérselo. A mí me iluminas hasta en los días más grises."],
  ["Tu ternura", "Tu ternura aparece en los gestos más pequeños. Es lo que más me desarma de ti."],
  ["Tu dulzura", "Tu dulzura no es debilidad, es tu manera de cuidar el mundo. Qué suerte la mía poder recibirla."],
  ["Tu bondad", "Tu bondad es sincera y sin cálculo. Se nota en cómo tratas a todos, incluso cuando nadie te ve."],
  ["Tu generosidad", "Das sin esperar nada a cambio, y eso te hace enorme. A tu lado aprendo a dar más."],
  ["Tu empatía", "Sabes ponerte en el lugar de los demás como pocos. Contigo nadie se siente solo."],
  ["Tu sensibilidad", "Sientes profundo y no lo escondes. Esa sensibilidad es una de tus mayores fortalezas."],
  ["Tu honestidad", "Contigo siempre sé a qué atenerme. Vivir con la verdad por delante es un regalo que no todos saben dar."],
  ["Tu sinceridad", "Me encanta que me digas lo que sientes con cariño y sin rodeos. Así es como se construye la confianza."],
  ["Tu lealtad", "Cuando estás, estás de verdad. Tu lealtad me da una tranquilidad que no sé explicar."],
  ["Tu humildad", "Tienes muchísimo de lo que presumir y casi nunca lo haces. Esa sencillez te hace aún más grande."],
  ["Tu paciencia", "Sabes esperar y entender los procesos. Contigo las cosas difíciles se sienten más llevaderas."],
  ["Tu calma", "Tienes una calma que contagia. Cuando todo se agita, tú eres el lugar tranquilo al que quiero volver."],
  ["Tu alegría", "Tu alegría se pega. Contigo hasta lo cotidiano se siente como una pequeña fiesta."],
  ["Tu optimismo", "Siempre encuentras algo bueno para mirar, incluso cuando cuesta. Me enseñas a ver el vaso medio lleno."],
  ["Tu autenticidad", "Eres tú, sin disfraces ni filtros. No cambiaría ni una sola parte de cómo eres."],
  ["Tu espontaneidad", "Tus ocurrencias de último momento son mis planes favoritos. Contigo nada es aburrido."],
  ["Tu madurez", "Tienes una forma tranquila y sabia de ver la vida. Me inspira cómo manejas lo que te toca."],
  ["Tu gratitud", "Sabes agradecer lo pequeño, y por eso lo pequeño a tu lado vale tanto. Es una forma muy bonita de vivir."],
  ["Tu capacidad de perdonar", "Perdonar con el corazón abierto no es fácil, y tú lo haces. Eso habla de lo grande que eres por dentro."],
  ["Tu corazón noble", "Tu corazón es limpio y generoso. Es de lo más valioso que me ha tocado conocer."],
  ["Tu fortaleza", "Eres más fuerte de lo que a veces crees. Y lo mejor es que lo eres con suavidad."],
  ["Tu valentía", "Ser valiente no es no tener miedo, es avanzar con él. Y tú lo haces con una elegancia que admiro."],
  ["Tu determinación", "Cuando decides algo, vas por ello. Me encanta ver esa fuerza en ti."],
  ["Tu perseverancia", "No te rindes aunque el camino se ponga largo. Tu constancia me motiva muchísimo."],
  ["Tu disciplina", "Tu orden y tu constancia me impresionan. Se nota lo que se logra cuando alguien se compromete así."],
  ["Tu ambición", "Sueñas en grande y trabajas para alcanzarlo. Me encanta ver cómo siempre vas por más."],
  ["Tu independencia", "Sabes quién eres y te sostienes por ti misma. Por eso estar contigo es una elección, no una necesidad, y la vuelvo a tomar cada día."],
  ["Tu seguridad", "Verte segura de ti misma es hermoso. Brillas más cuando confías en todo lo que vales."],
  ["Tu carácter", "Tienes carácter y sabes defender lo que piensas. Esa firmeza tuya me parece admirable."],
  ["Tu inteligencia", "Tu forma de pensar me deja sin palabras. Cada conversación contigo me enseña algo nuevo."],
  ["Tu curiosidad", "Tu curiosidad por todo me contagia. Contigo el mundo se vuelve un lugar para explorar."],
  ["Tu creatividad", "Ves cosas donde otros no ven nada y las conviertes en algo bonito. Tu imaginación es un regalo."],
  ["Tu ingenio", "Siempre tienes la respuesta o la idea inesperada. Tu ingenio me sorprende y me divierte."],
  ["Tu sentido del humor", "Me haces reír hasta de lo que no tiene gracia. Reír contigo es una de mis cosas favoritas."],
  ["Tus ganas de aprender", "Nunca dejas de querer saber más. Tus ganas de aprender te hacen brillar un poco más cada día."],
  ["Tu trabajo duro", "Veo el esfuerzo que pones en todo lo que haces. Admiro que siempre des lo mejor de ti."],
  ["Tus sueños", "Tus sueños merecen todo el espacio del mundo. Quiero verte alcanzarlos uno por uno y aplaudirte en cada paso."],
  ["Tus metas", "Tienes claro hacia dónde vas y eso me inspira. Estoy convencido de que llegarás muy lejos."],
  ["Tu forma de superar los problemas", "Cuando algo se complica, lo enfrentas con cabeza y con corazón. Nada te detiene por mucho tiempo."],
  ["Tu espíritu libre", "Tienes un alma libre que no se deja encerrar. Me encanta que seas así, y me encanta más cuando decides volar cerca de mí."],
  ["Tu forma de escuchar", "Cuando me escuchas, siento que de verdad me entiendes. No es poca cosa, y contigo siempre pasa."],
  ["Tu forma de cuidar", "Cuidas con pequeños detalles que lo dicen todo. A tu lado siento que alguien me cuida y me quiere."],
  ["Tu forma de amar", "Amas con entrega y con ternura. Qué hermoso es estar del lado de quien tú quieres."],
  ["Tu forma de hablar", "Tienes una forma de decir las cosas que las hace sonar mejor. Me quedo atento a cada palabra tuya."],
  ["Tu forma de mirar", "Miras el mundo con tanto cariño que me haces verlo distinto. Contigo todo se ve más bonito."],
  ["Tus detalles", "Tus detalles me dicen que piensas en mí cuando no estoy. No hay regalo que valga más que eso."],
  ["Tus ocurrencias", "Tus ocurrencias me sacan una sonrisa en el momento menos esperado. Nadie tiene ese toque tuyo."],
  ["Tus palabras de aliento", "Tus palabras llegan justo cuando las necesito. Con una frase tuya me siento capaz de todo."],
  ["Tu paciencia conmigo", "Gracias por tenerme paciencia y por quedarte en mis días torpes. No lo doy por sentado."],
  ["Tu cariño por los tuyos", "Cómo quieres a tu gente me dice mucho de ti. Quien ama así tiene un corazón enorme."],
  ["Tu entrega", "Cuando te das, te das completa. Es un privilegio ser testigo de esa entrega tuya."],
  ["Tu compromiso", "Cumples lo que prometes y eso vale oro. Contigo la confianza no se pide, se siente."],
  ["Tu fe", "Creer en algo más grande le da a tu vida una luz muy tuya. Me encanta ver cómo esa fe te sostiene y te acompaña."],
  ["Tu forma de hacerme reír", "Tienes el don de hacerme reír cuando más lo necesito. Eres mi mejor medicina para los días pesados."],
  ["Tu forma de hacerme sentir en casa", "Contigo me siento en casa sin importar el lugar. Tú eres mi hogar."],
  ["Tus rarezas", "Tus rarezas son lo que más me gusta de ti. Lo común nunca me enamoró; tú sí."],
  ["Tu gusto por las pequeñas cosas", "Sabes encontrar la belleza en lo sencillo, y por eso a tu lado hasta un día cualquiera se vuelve especial."],
  ["Tu manera de decir mi nombre", "Mi nombre suena diferente en tu voz, como si lo dijeras con cariño. Me gusta cada vez que lo pronuncias."],
  ["Tu manera de ser tú", "Ser tú misma es lo más hermoso que haces. No cambies nunca, porque así es como te quiero."],
  ["Que existas", "Que existas ya es motivo suficiente para dar gracias, y que estés en mi vida es el regalo más grande. Gracias por ser mi Rollito de Canela."]
];

export const emojis = ["❤️", "💕", "💖", "💗", "💓", "💞", "✨", "🌹", "🌸", "🫶", "💫", "♡", "🦋", "🌷", "🌟", "💌"];
export const colors = [0xffb7d5, 0xd6b8ff, 0xffd7e8, 0xb9c8ff, 0xf4c4ff];
export const STORE_KEY = 'universo-frases-v1';

export const messages = rawMessages.map(m => [m[0], m[1] || defaultMessage(m[0])]);
export const icons = rawMessages.map((m, i) => m[2] || emojis[i % emojis.length]);

// Cambios hechos desde el editor, guardados en este navegador
try {
  const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
  if (Array.isArray(saved)) {
    saved.forEach((e, i) => {
      if (!messages[i] || !e) return;
      const title = e.title || messages[i][0];
      messages[i] = [title, e.text || defaultMessage(title)];
      if (e.emoji) icons[i] = e.emoji;
    });
  }
} catch (err) {}