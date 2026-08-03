const ADJECTIVES = [
  '달콤한',
  '쌉싸름한',
  '부드러운',
  '꾸덕한',
  '고소한',
  '진한',
  '은은한',
  '상큼한',
  '따뜻한',
  '향긋한',
]

const NOUNS = [
  '카카오',
  '가나초콜릿',
  '밀크초코',
  '다크초코',
  '화이트초코',
  '빈투바',
  '프랄린',
  '트러플',
  '생초콜릿',
  '초코칩',
]

function randomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export function generateRandomNickname() {
  const adjective = ADJECTIVES[randomInt(ADJECTIVES.length)]
  const noun = NOUNS[randomInt(NOUNS.length)]
  const number = randomInt(100) + 1
  return `${adjective}${noun}${number}호`
}
