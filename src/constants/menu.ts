// type brandType = 'acceptCoffee' | 'belle'

import {
  almondCroissants,
  appleCreamCheesePie,
  basilSandwich,
  blueberryCreamCheeseCronut,
  brioche,
  chiveCreamCheeseSaltbread,
  chocobangoChocolates,
  garlicCroissants,
  hagelsugaMontBlanc,
  sausagePastry,
} from '@/assets/img/bakery'
import { blackForest, ceo_9, citricCaramel, fruityBerry, hogarden, nutsBerry, panama, tropicalJuice } from '@/assets/img/beans'
import { americano, cafelatte, einspenner, flatWhite, grapefruitAde, malchaLatteHot, oatmealLatte, singleOrigin, strawberryLatte } from '@/assets/img/drinks'

export const MENU_LIST = [
  /**음료- 커피 */
  {
    id: 1,
    brand: 'acceptCoffee',
    name: '싱글 오리진 커피',
    description: '각국 다양한 원산지, 품종, 가공방식의 커피를 경험할 수 있습니다.',
    gender: ['female', 'male'],
    image: singleOrigin,
  },
  {
    id: 2,
    brand: 'acceptCoffee',
    name: '아메리카노',
    description: '깊은 풍미의 에스프레소와 물이 조화를 이루는 기본 커피 메뉴입니다.',
    gender: ['female', 'male'],
    image: americano,
  },
  {
    id: 3,
    brand: 'acceptCoffee',
    name: '카페 라떼',
    description: '부드러운 우유와 조화로운 에스프레소가 어우러진 클래식한 라떼입니다.',
    gender: ['female'],
    image: cafelatte,
  },
  {
    id: 4,
    brand: 'acceptCoffee',
    name: '플랫 화이트',
    description: '우유 양이 적어 커피 본연의 풍미와 부드러운 텍스처가 돋보이는 메뉴입니다.',
    gender: ['female'],
    image: flatWhite,
  },
  {
    id: 5,
    brand: 'acceptCoffee',
    name: '아인슈페너',
    description: '블랙커피 위에 크림을 얹은 달콤하고 부드러운 커피 음료입니다.',
    gender: ['female'],
    image: einspenner,
  },
  /**음료- 베버리지 */
  {
    id: 6,
    brand: 'acceptCoffee',
    name: '딸기 라떼',
    description: '딸기의 상큼한 단맛과 우유가 조화를 이루는 인기 메뉴입니다.',
    gender: ['female', 'male'],
    image: strawberryLatte,
  },
  {
    id: 7,
    brand: 'acceptCoffee',
    name: '말차 라떼',
    description: '진한 말차의 씁쓸함과 우유의 부드러운 단맛이 조화를 이룬 건강한 라떼입니다.',
    gender: ['female', 'male'],
    image: malchaLatteHot,
  },
  {
    id: 8,
    brand: 'acceptCoffee',
    name: '오트 라떼',
    description: '고소한 오트밀크와 에스프레소가 만나 가볍고 부드러운 풍미를 느낄 수 있습니다.',
    gender: ['female', 'male'],
    image: oatmealLatte,
  },
  {
    id: 9,
    brand: 'acceptCoffee',
    name: '자몽 에이드',
    description: '상큼한 자몽과 탄산수가 어우러져 청량감이 뛰어난 상쾌한 음료입니다.',
    gender: ['female', 'male'],
    image: grapefruitAde,
  },
  {
    id: 10,
    brand: 'acceptCoffee',
    name: '오레오 프라페',
    description: '부드러운 프라페에 바삭한 오레오 크럼블이 더해진 달콤한 음료입니다.',
    gender: ['female', 'male'],
    image: '',
  },
  //** 원두 */
  {
    id: 11,
    brand: 'acceptCoffee',
    name: 'C타입 블랙포레스트',
    description: '각국의 다양한 원산지, 품종, 가공 방식을 통해 다채로운 커피 풍미를 경험할 수 있는 블렌드입니다.',
    gender: ['male'],
    image: blackForest,
    flavorProfile: '다크 초콜릿, 체리, 너티한 향이 어우러진 깊고 진한 풍미가 특징입니다.',
    brewingRecommendation: '깊고 풍부한 맛을 선호하는 분들에게 특히 인기가 높으며, 에스프레소 및 다양한 추출 방식에 잘 어울립니다.',
  },
  {
    id: 12,
    brand: 'acceptCoffee',
    name: 'B타입 시트릭카라멜',
    description: '밝고 경쾌한 산미와 달콤한 카라멜 풍미가 조화를 이루는 블렌드입니다. 다양한 원산지의 고품질 원두를 엄선해 블렌딩했습니다.',
    gender: ['female', 'male'],
    image: citricCaramel,
    flavorProfile: '시트러스류 과일의 상큼함과 부드러운 카라멜의 달콤함이 조화롭게 어우러집니다.',
    brewingRecommendation: '아메리카노나 핸드드립으로 밝고 달콤한 풍미가 잘 살아나며, 상쾌한 하루 시작에 추천드립니다.',
  },
  {
    id: 13,
    brand: 'acceptCoffee',
    name: 'P타입 너츠베리',
    description: '고소한 너츠 향과 달콤한 베리류의 과일향이 조화된 블렌드입니다.',
    gender: ['female', 'male'],
    image: nutsBerry,
    flavorProfile: '견과류의 고소함과 블루베리, 라즈베리 같은 베리류의 상큼한 향미가 어우러집니다.(추천 추출: 에스프레소, 핸드드립, 콜드브루)',
    brewingRecommendation: '특히 라떼로 즐길 때 고소함과 달콤함이 극대화됩니다.',
  },
  {
    id: 14,
    brand: 'acceptCoffee',
    name: 'F타입 프루티 베리',
    description: '싱그러운 과일 향과 상큼한 베리류의 풍미가 돋보이는 블렌드입니다.',
    gender: ['female'],
    image: fruityBerry,
    flavorProfile: '라즈베리, 블루베리 같은 베리류의 상큼함과 복숭아, 사과 같은 과일 향미가 어우러집니다.(추천 추출: 핸드드립, 에어로프레스, 콜드브루)',
    brewingRecommendation: '산미와 단맛의 밸런스가 좋아 아이스커피에 특히 좋습니다.',
  },
  {
    id: 14,
    brand: 'acceptCoffee',
    name: '트로피칼 주스 원두',
    description: '트로피컬 과일의 밝고 상큼한 향미가 특징인 블렌드입니다.',
    gender: ['female'],
    image: tropicalJuice,
    flavorProfile: '망고, 파인애플, 패션프루트 등 열대 과일 향 / 밝고 경쾌한 시트러스 산미 / 가볍고 깔끔한 질감 / 달콤한 과일 잼 같은 여운(추천 추출: 핸드드립, 에어로프레스, 콜드브루)',
    brewingRecommendation: '아이스커피나 콜드브루로 청량함을 선사합니다.',
  },
  {
    id: 15,
    brand: 'acceptCoffee',
    name: '호가든',
    description: '고급진 홍차의 뉘앙스와 시트러스함, 부드러운 단맛과 과실의 맛과 향, 모두가 즐기기 위하는 마음에 만들어진 블렌딩 입니다.',
    gender: ['female', 'male'],
    image: hogarden,
    flavorProfile: '자스민, 우롱차, 복숭아, 밀크 초콜릿',
  },
  {
    id: 16,
    brand: 'acceptCoffee',
    name: '파나마 앤썸 게이샤 내추럴',
    description: '파나마의 최상급 게이샤 품종으로, 내추럴 가공 방식으로 과일향과 꽃향이 극대화된 커피입니다',
    gender: ['female', 'male'],
    image: panama,
    flavorProfile: '재스민, 베르가못, 트로피컬 프루츠 / 밝고 선명한 시트러스 산미 / 실키한 질감 / 꿀 같은 달콤한 여운(추천 추출 : 핸드드립, 에어로프레스, V60, 사이폰)',
    brewingRecommendation: '섬세한 향미와 달콤함으로 커피 애호가들에게 깊은 인상을 남깁니다.',
  },
  {
    id: 17,
    brand: 'acceptCoffee',
    name: '과테말라 COE 9위 - 몬타나 엘라다 게이샤 워시드',
    description: '각국의 다양한 원산지, 품종, 가공방식 중에서도 최고 수준의 품질을 인정받은 과테말라 COE 9위 수상 커피입니다.',
    gender: ['female', 'male'],
    image: ceo_9,
    flavorProfile: '라즈베리, 레몬그라스 / 밝고 선명한 시트러스 산미 / 부드럽고 크리미한 질감 / 그린 애플, 피넛 크래커, 시럽 같은 달콤한 여운(추천 추출 :  핸드드립, V60, 에어로프레스)',
    brewingRecommendation: '복합적인 향미와 게이샤 특유의 플로럴함으로 깊은 인상을 남깁니다.',
  },
  /**빵 */
  {
    id: 18,
    brand: 'belle',
    name: '아몬드 크로와상',
    description: '구운아몬드의 고소함과 프랑스 버터 풍미가 가득한 크로와상.',
    gender: ['male'],
    image: almondCroissants,
  },
  {
    id: 19,
    brand: 'belle',
    name: '갈릭 크로와상',
    description: '갖 구운 크로와상에 갈릭소스와 크림치즈를 입혀 알싸함과 부드러운 크림치즈 2가지 맛을 느낄수 있는 베이커리',
    gender: ['male'],
    image: garlicCroissants,
  },
  {
    id: 20,
    brand: 'belle',
    name: '초코뱅오 쇼콜라',
    description: '초콜릿의 달콤함과 버터리한 뱅오의 절묘한 만남!',
    gender: ['male'],
    image: chocobangoChocolates,
  },
  {
    id: 21,
    brand: 'belle',
    name: '소시지 페스트리',
    description: '소시지 고유의 맛을 잘살리고, 페스츄리의 담백함을 동시에 느낄수있어 남녀노소 누구나 선호하는 베이커리',
    gender: ['male'],
    image: sausagePastry,
  },
  {
    id: 22,
    brand: 'belle',
    name: '쪽파크림치즈 소금빵',
    description: '쫄깃한 소금빵에 느끼함이 없는 특제 쪽파크림치즈와 베이컨의 조화',
    gender: ['male'],
    image: chiveCreamCheeseSaltbread,
  },
  {
    id: 23,
    brand: 'belle',
    name: '블루베리 크림치즈 크로넛',
    description: '크림치즈와 블루베리 글레이즈가 더해져 달달한 블루베리 풍미를 느낄 수 있는 페스츄리!',
    gender: ['female'],
    image: blueberryCreamCheeseCronut,
  },
  {
    id: 24,
    brand: 'belle',
    name: '하겔슈가 몽블랑',
    description: '우뚝 솟은 산맥모양으로 본떠 만든 페스츄리 빵에 오렌지 시럽을첨가해 입안에 오랫동안 감도는페스츄리!',
    gender: ['female', 'male'],
    image: hagelsugaMontBlanc,
  },
  {
    id: 25,
    brand: 'belle',
    name: '애플크림치즈파이',
    description: '사과파이필링과 크림치즈를 입혀 풍미가 감도는 파이!',
    gender: ['female', 'male'],
    image: appleCreamCheesePie,
  },
  {
    id: 26,
    brand: 'belle',
    name: '브리오슈',
    description: '부드럽고 버터풍미가득한 브리오슈에 크림 한가득 느낄수있는 베이커리',
    gender: ['female', 'male'],
    image: brioche,
  },
  {
    id: 27,
    brand: 'belle',
    name: '바질 샌드위치',
    description: '올리브유와 신선한 바질의 향이 진하게 풍기는 샌드위치',
    gender: ['female'],
    image: basilSandwich,
  },
]
