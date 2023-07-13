interface AudioPlayer {
    audioVolume: number
    songDuration: number
    song: string
    details: Details
}

interface Details {
    author: string
    year: number
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Pajarito Colibrí",
    details: {
        author: "Natalia Lafourcade",
        year: 2022
    }
}

const song = 'New song'
const { song: anotherSong, songDuration: duration, details } = audioPlayer
const { author } = details

console.log(`Nueva canción: ${song}`);
console.log(`Nombre de la canción: ${audioPlayer.song}`);
console.log(`Nombre de la canción con desestructuración: ${anotherSong}`);
console.log(`Duración de la canción con desestructuración: ${duration}`);
console.log(`Autor de la canción con desestructuración: ${author}`);

const dbz: string[] = ['Goku', 'Vegeta', 'Trunks']

const [ , , trunks = 'Not found' ] = dbz

console.log(`Persona 3: ${dbz[2]}`);
console.log(`Persona 3: ${dbz[3] || 'Personaje no encontrado'}`);
console.log(`Personaje 3: ${trunks}`);

export {}