import { ReviewImg, Review1, Review2, Review3 } from '@/assets';
import { IReviewItem } from '@/types/';

export const reviews: IReviewItem[] = [
  {
    id: 1,
    rating: 3,
    date: 'Учора',
    text: 'Купив дівчині сережки с серцем, їй дуже сподобались. Вдячний за швидку доставку та дійсно якісний товар. За потреби звернуся іще.',
    customerName: 'Роман Матвійчук',
    avatar: Review3,
    location: 'Калуш',
  },
  {
    id: 2,
    rating: 2,
    date: 'Учора',
    text: 'Замовила цю каблучку з місяцем – і вона просто неймовірна!  Витончений дизайн, гарна деталізація, ідеально сидить на пальці. Дуже ніжна і стильна річ, яка пасує до будь-якого образу.\nДоставка була швидкою, а упаковка – просто розкішна, ідеальна для подарунка. Я в захваті!',
    customerName: 'Олена Залуцька',
    avatar: Review1,
    location: 'Кривий Ріг',
  },
  {
    id: 3,
    rating: 5,
    date: 'Тиждень тому',
    text: `Придбала підвіску із білого золота у вигляді каблучки, і в захваті! Вона виглядає дуже стильно, а блиск білого золота привертає погляди. Дякую :) Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eligendi minus officia eaque perferendis, impedit odit dolore expedita ducimus consectetur ea aperiam error perspiciatis reprehenderit voluptas libero sapiente eum sunt!
    Hic inventore nulla quis a atque rerum eius eveniet voluptatibus consectetur porro fugiat ipsa dolore perspiciatis adipisci, quod vitae obcaecati rem itaque laboriosam voluptates aspernatur nihil? Temporibus assumenda odio incidunt.
    Laborum dolores voluptate distinctio quis labore, esse totam quisquam deserunt quam ea libero. Deserunt distinctio nam ex iusto culpa accusantium veritatis quod labore eveniet, amet molestias, totam quisquam. Adipisci, reiciendis.`,
    customerName: 'Ярина Тополя',
    location: 'Харків',
    hasProductImage: true,
    avatar: Review2,
    image: ReviewImg,
  },
  {
    id: 4,
    rating: 4,
    date: '1 березня',
    text: `Купував ці сережки з сапфіром на подарунок дружині,вона таке дуже любить :)  Камені мають глибокий синій колір, виглядають елегантно та дорого. Дуже гарна робота, видно якість і увагу до деталей. Окремо дякую за швидкий сервіс. orem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eligendi minus officia eaque perferendis, impedit odit dolore expedita ducimus consectetur ea aperiam error perspiciatis reprehenderit voluptas libero sapiente eum sunt!
    Hic inventore nulla quis a atque rerum eius eveniet voluptatibus consectetur porro fugiat ipsa dolore perspiciatis adipisci, quod vitae obcaecati rem itaque laboriosam voluptates aspernatur nihil? Temporibus assumenda odio incidunt.
    Laborum dolores voluptate distinctio quis labore, esse totam quisquam deserunt quam ea libero. Deserunt distinctio nam ex iusto culpa accusantium veritatis quod labore eveniet, amet molestias, totam quisquam. Adipisci, reiciendis.`,
    customerName: 'Віктор Глібов',
    avatar: Review3,
    location: 'Лубни',
  },
  {
    id: 5,
    rating: 3,
    date: '20 березня',
    text: 'Обрала браслет з сапфіром на подарунок для мами, так як вона вже має такі сережки. Дорогувато, але воно того вартує :) подарункове пакування викликав особливий захват також. Рекомендуватиму друзям однозначно.',
    customerName: 'Аліна Соловей',
    avatar: Review1,
    location: 'Долина',
  },
];
