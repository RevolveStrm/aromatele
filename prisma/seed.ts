import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Started prisma seeding...`);

  const coffee = await prisma.category.create({
    data: {
      title: "Кава",
      description:
        "Теплі напої на основі кави, що зігрівають і надихають на нові звершення.",
    },
  });

  const icedCoffee = await prisma.category.create({
    data: {
      title: "Холодна кава",
      description: "Охолоджені кавові напої, ідеальні для спекотної погоди.",
    },
  });

  const lemonades = await prisma.category.create({
    data: {
      title: "Лимонади",
      description:
        "Свіжі та кисло-солодкі напої на основі лимону та інших фруктів.",
    },
  });

  const otherDrinks = await prisma.category.create({
    data: {
      title: "Інші напої",
      description:
        "Напої, що не підпадають під основні категорії, але є не менш смачними.",
    },
  });

  const sandwiches = await prisma.category.create({
    data: {
      title: "Сендвічі",
      description: "Легкі закуски на основі хліба з різноманітними начинками.",
    },
  });

  const desserts = await prisma.category.create({
    data: {
      title: "Десерти",
      description: "Солодощі та смаколики для кожного гурмана.",
    },
  });

  await prisma.product.create({
    data: {
      title: "Еспресо",
      price: 25.0,
      shortDescription: "Класичний еспресо з насиченим смаком.",
      fullDescription:
        "Чистий еспресо з гіркуватим, насиченим смаком і ароматом.",
      categoryId: coffee.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Подвійний Еспресо",
      price: 35.0,
      shortDescription: "Подвійна порція еспресо для справжніх гурманів.",
      fullDescription:
        "Насичений смак еспресо з подвійною дозою кавових зерен для потужного ефекту.",
      categoryId: coffee.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Раф",
      price: 50.0,
      shortDescription: "Кава з ніжним смаком і кремовою текстурою.",
      fullDescription:
        "Класичний еспресо з додаванням молока та ванільного сиропу, створюючи ніжну і кремову консистенцію.",
      categoryId: coffee.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Капучино",
      price: 50.0,
      shortDescription: "Кава з молочною пінкою.",
      fullDescription:
        "Еспресо, покрите густою, кремовою молочною пінкою для ідеального поєднання смаків.",
      categoryId: coffee.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Капучино XL",
      price: 65.0,
      shortDescription: "Велика порція класичного капучино.",
      fullDescription:
        "Еспресо з молоком і пінкою в збільшеному обсязі для справжніх любителів кави.",
      categoryId: coffee.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Лате",
      price: 50.0,
      shortDescription: "Кава з молочною пінкою.",
      fullDescription:
        "Еспресо з додаванням гарячого молока і легким шаром пінки для м'якого смаку.",
      categoryId: coffee.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Лате XL",
      price: 70.0,
      shortDescription: "Великий лате для справжніх поціновувачів кави.",
      fullDescription:
        "Лате з гарячим молоком і пінкою в збільшеному обсязі для максимального задоволення.",
      categoryId: coffee.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Айсі кава",
      price: 60.0,
      shortDescription: "Кава з льодом, ідеальна для літніх днів.",
      fullDescription:
        "Холодна кава з льодом, молоком і солодким сиропом — ідеальний напій для спеки.",
      categoryId: icedCoffee.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Фрапучіно",
      price: 70.0,
      shortDescription: "Кава з льодом і збитими вершками.",
      fullDescription:
        "Холодна кава з льодом, молоком і збитими вершками — охолоджений десерт у чашці.",
      categoryId: icedCoffee.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Лимонад",
      price: 40.0,
      shortDescription: "Класичний лимонад, освіжаючий і кислуватий.",
      fullDescription:
        "Освіжаючий лимонад, виготовлений зі свіжого лимону, з додаванням цукру для балансу кислинки.",
      categoryId: lemonades.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Малиновий лимонад",
      price: 45.0,
      shortDescription: "Лимонад з малиновим смаком.",
      fullDescription:
        "Лимонад з додаванням малини, що надає напою яскравий і освіжаючий смак.",
      categoryId: lemonades.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Чай чорний",
      price: 30.0,
      shortDescription: "Традиційний чорний чай.",
      fullDescription:
        "Чорний чай з багатим смаком і ароматом, що ідеально підходить для холодних вечорів.",
      categoryId: otherDrinks.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Чай зелений",
      price: 30.0,
      shortDescription: "Класичний зелений чай.",
      fullDescription:
        "Зелений чай, що приносить відчуття бадьорості та спокою, з тонким ароматом і легкою гіркуватістю.",
      categoryId: otherDrinks.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Сік апельсиновий",
      price: 35.0,
      shortDescription: "Соковитий апельсиновий сік.",
      fullDescription:
        "Свежий апельсиновий сік, який бадьорить і дарує енергію на весь день.",
      categoryId: otherDrinks.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Сендвіч з тунцем",
      price: 60.0,
      shortDescription: "Сендвіч з тунцем і овочами.",
      fullDescription:
        "Свіжий сендвіч з тунцем, салатом, помідорами та майонезом для легкого обіду.",
      categoryId: sandwiches.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Сендвіч з куркою",
      price: 55.0,
      shortDescription: "Сендвіч з куркою і сиром.",
      fullDescription:
        "Теплий сендвіч з курячим філе, сиром і соусом, що ідеально підходить для сніданку чи перекусу.",
      categoryId: sandwiches.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Торт Шоколадний",
      price: 80.0,
      shortDescription: "Шоколадний торт.",
      fullDescription:
        "Насичений шоколадний торт з кремом, що сподобається кожному любителю шоколаду.",
      categoryId: desserts.id,
    },
  });

  await prisma.product.create({
    data: {
      title: "Пиріжок з вишнею",
      price: 30.0,
      shortDescription: "Пиріжок з вишневим джемом.",
      fullDescription:
        "Солодкий пиріжок з вишневим начинням, що приносить радість і смакоту в кожному укусі.",
      categoryId: desserts.id,
    },
  });

  console.log("Categories and products have been created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
