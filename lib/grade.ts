export interface GradeInfo {
  name: string
  icon: string
  minReviews: number
  maxReviews: number
  description: string
}

const GRADES: GradeInfo[] = [
  {
    name: '초코 입문자',
    icon: '🍫',
    minReviews: 0,
    maxReviews: 2,
    description: '초콜릿 세계에 막 발을 들인 초보 초코덕후',
  },
  {
    name: '카카오 러버',
    icon: '☕',
    minReviews: 3,
    maxReviews: 9,
    description: '초콜릿에 푹 빠진 진짜 애호가',
  },
  {
    name: '마스터 빈투바',
    icon: '🏆',
    minReviews: 10,
    maxReviews: Infinity,
    description: '초콜릿을 깊이 이해하는 마스터',
  },
]

export function getGradeByReviewCount(reviewCount: number): GradeInfo {
  return (
    GRADES.find(
      (grade) => reviewCount >= grade.minReviews && reviewCount <= grade.maxReviews
    ) ?? GRADES[0]
  )
}

export function getNextGradeInfo(reviewCount: number): {
  nextGrade: GradeInfo | null
  remaining: number
} {
  const currentGrade = getGradeByReviewCount(reviewCount)
  const currentIndex = GRADES.findIndex((g) => g.name === currentGrade.name)
  const nextGrade = GRADES[currentIndex + 1]

  if (!nextGrade) {
    return { nextGrade: null, remaining: 0 }
  }

  return {
    nextGrade,
    remaining: nextGrade.minReviews - reviewCount,
  }
}

export { GRADES }
