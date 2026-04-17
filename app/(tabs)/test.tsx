import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const { width, height } = Dimensions.get("window");

// --- АСУУЛТЫН САН (Нийт 80 асуулт) ---
const QUESTIONS_DATABASE = [
  {
    id: 1,
    q: "ХАБЭА-н тухай хууль хэзээ батлагдсан бэ?",
    a: ["2008.03.22", "2018.03.22", "2008.05.22", "2018.05.22"],
    correct: 2,
  },
  {
    id: 2,
    q: "ХАБЭА-н тухай хууль хэдэн бүлэг хэдэн зүйлтэй вэ?",
    a: [
      "10 бүлэг 37 зүйлтэй",
      "9 бүлэг 37 зүйлтэй",
      "8 бүлэг 37 зүйлтэй",
      "7 бүлэг 37 зүйлтэй",
    ],
    correct: 2,
  },
  {
    id: 3,
    q: "Хөдөлмөрлөх явцад хүний эрүүл мэндийг хэвээр хадгалах үйл ажиллагааг юу гэх вэ?",
    a: ["ХАБ", "ХАБЭА", "Хөдөлмөрийн эрүүл ахуй", "Хөдөлмөрийн нөхцөл"],
    correct: 1,
  },
  {
    id: 4,
    q: "Үйлдвэрлэлийн аюултай хүчин зүйлийн түвшин зөвшөөрөгдсөн хэмжээнээс хэтрээгүй байхыг юу гэх вэ?",
    a: ["ХАБ", "ХАБЭА", "Хөдөлмөрийн эрүүл ахуй", "Хөдөлмөрийн нөхцөл"],
    correct: 2,
  },
  {
    id: 5,
    q: "Хими, физик, биологийн хүчин зүйлээс өвчлөхөөс урьдчилан сэргийлэх үйл ажиллагаа?",
    a: ["ХАБ", "ХАБЭА", "Хөдөлмөрийн эрүүл ахуй", "Хөдөлмөрийн нөхцөл"],
    correct: 2,
  },
  {
    id: 6,
    q: "Ажиллах чадвар, эрүүл мэндэд нөлөөлөх ажлын байрны орчныг юу гэх вэ?",
    a: ["ХАБ", "ХАБЭА", "Хөдөлмөрийн эрүүл ахуй", "Хөдөлмөрийн нөхцөл"],
    correct: 3,
  },
  {
    id: 7,
    q: "Хүний эрүүл мэндэд нөлөөлж өвчлүүлэх уршиг бүхий үйлдвэрлэлийн хүчин зүйл?",
    a: ["Эрүүл ахуй", "Нөхцөл", "Хортой хүчин зүйл", "Аюултай хүчин зүйл"],
    correct: 2,
  },
  {
    id: 8,
    q: "Ажлын ээлжийн хугацаанд амь насанд аюул учруулах хүчин зүйл?",
    a: ["Эрүүл ахуй", "Нөхцөл", "Хортой хүчин зүйл", "Аюултай хүчин зүйл"],
    correct: 3,
  },
  {
    id: 9,
    q: "Хурц хордлого гэж юу вэ?",
    a: [
      "Бодисын нөлөөгөөр богино хугацаанд хордох",
      "Биологийн идэвхт бодист хордох",
      "Химийн бодист хордох",
    ],
    correct: 0,
  },
  {
    id: 10,
    q: "Ажил олгогчийн хяналтын дор байх бүх байрыг юу гэх вэ?",
    a: ["Ахуйн байр", "Амрах байр", "Амралтын байр", "Ажлын байр"],
    correct: 3,
  },
  {
    id: 11,
    q: "Нэг бүрийн хамгаалах хэрэгсэл гэж юу вэ?",
    a: [
      "Хортой хүчин зүйлээс хамгаалах",
      "Хортой, аюултай хүчин зүйлээс хамгаалах хэрэгсэл",
      "Аюултай хүчин зүйлээс хамгаалах",
      "Олон хүнийг хамгаалах",
    ],
    correct: 1,
  },
  {
    id: 12,
    q: "Хамтын хамгаалах хэрэгсэл гэж юу вэ?",
    a: [
      "1 ажилтныг хамгаалах",
      "2 ба түүнээс дээш ажилтныг нэгэн зэрэг хамгаалах",
      "3 ба түүнээс дээш ажилтныг хамгаалах",
      "4 ба түүнээс дээш ажилтныг хамгаалах",
    ],
    correct: 1,
  },
  {
    id: 13,
    q: "ХАБЭА-н зардалд үйлдвэрлэлийн зардлын хэдэн хувийг зарцуулах вэ?",
    a: ["0.5-с доошгүй", "1-с доошгүй", "1.5-с доошгүй", "2-с доошгүй"],
    correct: 1,
  },
  {
    id: 14,
    q: "Н-ийн А-05 тоот тушаал хэзээ батлагдсан бэ?",
    a: ["2016.01.04", "2017.01.04", "2018.01.04", "2019.01.04"],
    correct: 2,
  },
  {
    id: 15,
    q: "Н-ийн А-05-ын дагуу ажилтны онолын сургалт хэдэн цаг вэ?",
    a: ["1", "2", "3", "4"],
    correct: 3,
  },
  {
    id: 16,
    q: "Н-ийн А-54 тоот тушаал хэзээ батлагдсан бэ?",
    a: ["2017.02.13", "2020.02.13", "2018.02.13", "2019.02.13"],
    correct: 1,
  },
  {
    id: 17,
    q: "Гар багаж хэрэгслийг ажиллуулах зарчмаас нь хамааруулан хэд ангилдаг вэ?",
    a: ["2", "3", "4", "5"],
    correct: 0,
  },
  {
    id: 18,
    q: "Гар багаж ашигладаг салбар нэгж ямар бичиг баримт хөтлөх вэ?",
    a: [
      "Ашиглалтын дэвтэр",
      "Техникийн пасспорт",
      "Засвар үйлчилгээний дэвтэр",
      "Ашиглалтын дэвтэр, техникийн пасспорт",
    ],
    correct: 3,
  },
  {
    id: 19,
    q: "Н-ийн А-199 тоот тушаал хэзээ батлагдсан бэ?",
    a: ["2018.04.30", "2019.04.30", "2020.04.30", "2021.04.30"],
    correct: 2,
  },
  {
    id: 20,
    q: "ХАБЭА-н 3 шатны хяналтыг зохион байгуулах замын даргын тушаал?",
    a: ["А-26", "А-156", "А-199", "А-182"],
    correct: 3,
  },
  {
    id: 21,
    q: "Осолд өртсөн ажилтныг эмнэлэгт хүргэх зардлыг хэдэн цагийн дотор авах вэ?",
    a: ["12 цаг", "24 цаг", "48 цаг", "72 цаг"],
    correct: 1,
  },
  {
    id: 22,
    q: "ХАБЭА-н 1-р шатны үзлэгээр хэдэн төрлийн зүйлийг шалгадаг вэ?",
    a: ["8", "10", "12", "14"],
    correct: 1,
  },
  {
    id: 23,
    q: "ХАБЭА-н 3-р шатны хяналтыг ямар хугацаанд хийдэг вэ?",
    a: ["7 хоног", "14 хоног", "Сар тутам", "Улиралд 1 удаа"],
    correct: 2,
  },
  {
    id: 24,
    q: "ХАБЭА-н зааварчилгаа үндсэн хэдэн хэлбэртэй вэ?",
    a: ["1", "2", "3", "4"],
    correct: 2,
  },
  {
    id: 25,
    q: "Ажлын байран дахь анхан шатны зааварчилгааг хэдэн цагаас багагүй өгөх вэ?",
    a: ["1", "2", "3", "4"],
    correct: 1,
  },
  {
    id: 26,
    q: "Осол гарсны дараах ээлжит бус зааварчилгааг хэд хоногт багтаан өгөх вэ?",
    a: ["1", "2", "3", "24 цаг"],
    correct: 3,
  },
  {
    id: 27,
    q: "Ээлжийн амралт эдлээд ирсэн ажилтанд ямар зааварчилгаа өгөх вэ?",
    a: ["Урьдчилсан", "Ээлжит", "Ээлжит бус", "Анхан шат"],
    correct: 2,
  },
  {
    id: 28,
    q: "Аялал, зугаалга зохион байгуулах үед зааварчилгаа өгөх үү?",
    a: ["Өгнө", "Шаардлагагүй"],
    correct: 0,
  },
  {
    id: 29,
    q: "Н-ийн А-442 тоот тушаал хэзээ батлагдсан бэ?",
    a: ["2018.09.28", "2019.09.28", "2020.09.28", "2021.09.28"],
    correct: 1,
  },
  {
    id: 30,
    q: "А-310 тоот тушаалд юуг заасан бэ?",
    a: ["Сарын аян", "Осол бүртгэх журам", "Өвөлжигчдийн сургалт"],
    correct: 1,
  },
  {
    id: 31,
    q: "Н-ийн А-156 тоот тушаал хэзээ батлагдсан бэ?",
    a: ["2021.03.05", "2021.02.05", "2022.03.05", "2022.02.05"],
    correct: 0,
  },
  {
    id: 32,
    q: "Зам дээр зөрчил гаргасан ажилтнаас ямар шалгалт авах вэ?",
    a: ["Дүрэм, заавар", "Техникийн шалгалт", "ХАБЭА-н мэдлэг"],
    correct: 2,
  },
  {
    id: 33,
    q: "Зам дээр хүн зөрчлийн нийт хэдэн жагсаалт байдаг вэ?",
    a: ["24", "26", "28", "30"],
    correct: 2,
  },
  {
    id: 34,
    q: "Зөрчил бүртгэх дэвтрийг хэзээ шалгадаг вэ?",
    a: ["Өдөр бүр", "7 хоног бүр", "Сар бүр", "Улирал бүр"],
    correct: 1,
  },
  {
    id: 35,
    q: "Хор саармагжуулах бүтээгдэхүүний 1 хүнд ноогдох хэмжээ?",
    a: ["0.10 л", "0.15 л", "0.20 л", "0.25 л"],
    correct: 3,
  },
  {
    id: 36,
    q: "Хор саармагжуулах бүтээгдэхүүний хэрэглээнд хэн хяналт тавих вэ?",
    a: ["Дарга нар", "Инженер, ҮЭХ", "Дарга, Санхүү тасаг"],
    correct: 2,
  },
  {
    id: 37,
    q: "Н-ийн А-26 тоот тушаал юуны талаар вэ?",
    a: [
      "Технологийн карт",
      "Эрсдэлийн үнэлгээ хийх журам",
      "Чиг үүрэг",
      "Сургалтын журам",
    ],
    correct: 1,
  },
  {
    id: 38,
    q: "Н-ийн А-26 тоот тушаал хэзээ батлагдсан бэ?",
    a: ["2022.01.10", "2023.01.10", "2022.02.10", "2023.02.10"],
    correct: 1,
  },
  {
    id: 39,
    q: "Аюул гэж юу вэ?",
    a: [
      "Бодит аюул бүхий эх үүсвэр",
      "Илрүүлж тодорхойлох явц",
      "Магадлал ба хохирлын нэгдэл",
    ],
    correct: 0,
  },
  {
    id: 40,
    q: "Эрсдэл гэж юу вэ?",
    a: [
      "Бодит аюул бүхий эх үүсвэр",
      "Илрүүлж тодорхойлох явц",
      "Магадлал ба хохирлын нэгдэл",
    ],
    correct: 2,
  },
  {
    id: 41,
    q: "Эрсдэлийг үнэлэх үйл ажиллагааг хэдэн түвшинд хийх вэ?",
    a: ["1", "2", "3", "4"],
    correct: 1,
  },
  {
    id: 42,
    q: "Ажлын аюулын шинжилгээг хэнтэй хамтран хийх вэ?",
    a: ["ХАБ ажилтан", "Ажилтан өөрөө", "Ажил удирдагч, техникч", "Бүгд буруу"],
    correct: 2,
  },
  {
    id: 43,
    q: "Үзлэгээр аюул илэрвэл ямар арга хэмжээ авах вэ?",
    a: ["Үргэлжлүүлнэ", "Мэдээлэх хуудас бөглөнө", "Утсаар мэдээлнэ"],
    correct: 1,
  },
  {
    id: 44,
    q: "2-р түвшний эрсдэлийн үнэлгээг жилд хэдэн удаа хийх вэ?",
    a: ["1", "2", "3", "4"],
    correct: 0,
  },
  {
    id: 45,
    q: "Хөдөлмөрийн чадвар алдалтыг ямар комисс шийдэх вэ?",
    a: ["Эмнэлэг", "Эмнэлэг хөдөлмөрийн магадлах", "Шүүх", "Цагдаа"],
    correct: 1,
  },
  {
    id: 46,
    q: "Үйлдвэрлэлийн ослын зэрэглэлийг хэд ангилдаг вэ?",
    a: ["1", "2", "3", "4"],
    correct: 2,
  },
  {
    id: 47,
    q: "Ослын зэрэглэлийг юу гэж ангилдаг вэ?",
    a: [
      "Хөнгөн, Хүнд",
      "Хөнгөн, дунд, хүнд",
      "Хөнгөн, нас барсан",
      "Хөнгөн, хүнд, нас барсан",
    ],
    correct: 3,
  },
  {
    id: 48,
    q: "Бүлэг осол гэж юу вэ?",
    a: [
      "2 ба түүнээс дээш",
      "3 ба түүнээс дээш",
      "4 ба түүнээс дээш",
      "5 ба түүнээс дээш",
    ],
    correct: 0,
  },
  {
    id: 49,
    q: "Н-ийн А-24 тоот тушаал юуны талаар вэ?",
    a: ["Эрсдэл", "Хамгаалах хэрэгсэл", "Технологийн карт", "3 шатны хяналт"],
    correct: 2,
  },
  {
    id: 50,
    q: "Технологийн картыг хэн батлах вэ?",
    a: ["Дарга, ерөнхий инженер", "Дарга", "Орлогч", "Инженер"],
    correct: 0,
  },
  {
    id: 51,
    q: "Технологийн карт нь ямар хэсгээс бүрддэг вэ?",
    a: ["Текст", "Текст, график", "Текст, бичвэр", "Зөвхөн зураг"],
    correct: 1,
  },
  {
    id: 52,
    q: "Технологийн картыг хэн боловсруулах вэ?",
    a: ["Ажлын хэсэг", "Орлогч", "Ерөнхий инженер", "Инженер"],
    correct: 0,
  },
  {
    id: 53,
    q: "Картыг хэдэн удаагийн зураг авалтаар тооцдог вэ?",
    a: ["2", "3", "4", "5"],
    correct: 1,
  },
  {
    id: 54,
    q: "Картад тусгах ажилбарыг юу гэж ангилах вэ?",
    a: [
      "Бэлтгэл, үндсэн, төгсгөл",
      "Бэлтгэл, үндсэн",
      "Бэлтгэл, төгсгөл",
      "Бэлтгэл",
    ],
    correct: 0,
  },
  {
    id: 55,
    q: "Эрсдэлийг урьдчилсан анхааруулах ажилбарыг ямар өнгөөр тэмдэглэх вэ?",
    a: ["Ногоон", "Саарал", "Шар", "Улбар шар"],
    correct: 3,
  },
  {
    id: 56,
    q: "370 тоот тушаалаар нийт хэдэн төрлийн сургалт байдаг вэ?",
    a: ["5", "6", "7", "8"],
    correct: 1,
  },
  {
    id: 57,
    q: "Чадвар алдсан ажилтанд сарын цалинг 5 дахин олгох хувь?",
    a: ["30 хүртэл", "30-50 хүртэл", "50-70 хүртэл", "70 ба түүнээс дээш"],
    correct: 0,
  },
  {
    id: 58,
    q: "Сарын цалинг 7 дахин олгох хувь?",
    a: ["30 хүртэл", "30-50 хүртэл", "50-70 хүртэл", "70 ба түүнээс дээш"],
    correct: 1,
  },
  {
    id: 59,
    q: "Сарын цалинг 9 дахин олгох хувь?",
    a: ["30 хүртэл", "30-50 хүртэл", "50-70 хүртэл", "70 ба түүнээс дээш"],
    correct: 2,
  },
  {
    id: 60,
    q: "Сарын цалинг 18 дахин олгох хувь?",
    a: ["30 хүртэл", "30-50 хүртэл", "50-70 хүртэл", "70 ба түүнээс дээш"],
    correct: 3,
  },
  {
    id: 61,
    q: "Ээлжит бус зааварчилгааг ямар үед өгөх вэ?",
    a: ["Аялал, зугаалга", "Томилолт", "Амралтаас ирэх", "Бүгд зөв"],
    correct: 3,
  },
  {
    id: 62,
    q: "УБТЗ-ын ХАБЭА-н дүрмийн гол зорилго?",
    a: ["Орчин бүрдүүлэх, хянах", "Сахилга сайжруулах", "Мэдлэг олгох"],
    correct: 0,
  },
  {
    id: 63,
    q: "Аюулгүйн замналыг хэн хийж, хэн хянах вэ?",
    a: ["ҮЭХ", "Салбарын дарга", "ХАБ ажилтан"],
    correct: 1,
  },
  {
    id: 64,
    q: "Нийт ажилтны сургалт жилд хэдэн цагаас багагүй байх вэ?",
    a: ["10", "20", "30", "40"],
    correct: 1,
  },
  {
    id: 65,
    q: "50 хүртэл ажилтантай бол ямар өрөөтэй байх вэ?",
    a: ["Танхим", "Өрөө", "Булан"],
    correct: 2,
  },
  {
    id: 66,
    q: "50-аас дээш ажилтантай бол ямар өрөөтэй байх вэ?",
    a: ["Танхим", "Өрөө", "Булан"],
    correct: 0,
  },
  {
    id: 67,
    q: "Ослын актыг хэдэн хувь үйлддэг вэ?",
    a: ["1", "2", "3", "4"],
    correct: 3,
  },
  {
    id: 68,
    q: "Эрсдэлийн үнэлгээ гэж юу вэ?",
    a: [
      "Илрүүлэн үнэлэх арга",
      "Хохирол учруулах хүчин зүйл",
      "Үнэлэлт өгөх үйл явц",
    ],
    correct: 2,
  },
  {
    id: 69,
    q: "Салбар нэгжүүд ямар хугацаанд үзлэг хийх вэ?",
    a: ["Сар бүр", "Улирал бүр", "Улиралд 2 удаа"],
    correct: 0,
  },
  {
    id: 70,
    q: "Ээлжит давтан зааварчилгааг ямар хугацаанд өгөх вэ?",
    a: ["Улиралд 1", "7 хоног тутам", "Осол гарахад", "Сард 1"],
    correct: 3,
  },
  {
    id: 71,
    q: "Хувцас хэрэглэлийг зөв хэрэглэхийг хэн сургах вэ?",
    a: ["Ажил олгогч", "Ажил удирдагч", "Инженер"],
    correct: 1,
  },
  {
    id: 72,
    q: "Галын аюулгүй байдал гэж юу вэ?",
    a: [
      "Хамгаалагдсан байдал",
      "Гал гарч хохирол учруулах",
      "Унтраах үйл ажиллагаа",
    ],
    correct: 0,
  },
  {
    id: 73,
    q: "Хувцсанд гал авалцвал ямар арга хэмжээ авах вэ?",
    a: ["Зогс-суу-өнхөр", "Зогс-хэвт-өнхөр", "Гүйх"],
    correct: 1,
  },
  {
    id: 74,
    q: "Иргэн галын аюулгүй байдлын талаар хэдэн үүрэг хүлээх вэ?",
    a: ["2", "3", "4", "5"],
    correct: 2,
  },
  {
    id: 75,
    q: "Галын аюулгүй байдлыг хангах иргэний үүрэг?",
    a: ["Мэдэгдэх", "Туслах", "Мэдээлэх", "Бүгд зөв"],
    correct: 3,
  },
  {
    id: 76,
    q: "Аюулгүйн замналыг хэн баталгаажуулах вэ?",
    a: ["Ажилтан", "Инженер", "Салбарын дарга"],
    correct: 2,
  },
  {
    id: 77,
    q: "Зааварчилгааны чиглэл нь юу вэ?",
    a: [
      "Тухайн өдөрт",
      "Осол зөрчилгүй байхад",
      "Мэдлэг, ур чадвар бататгахад",
    ],
    correct: 2,
  },
  {
    id: 78,
    q: "МУ-ын ХАБЭА-н бодлогын үндэс?",
    a: [
      "Хамгаалахад оршино",
      "Амь нас хамгаалахад чиглэнэ",
      "Гадаад иргэнийг хамгаалахад",
    ],
    correct: 1,
  },
  {
    id: 79,
    q: "Осол нуун дарагдуулбал хэдэн нэгжээр торгох вэ?",
    a: ["100", "200", "300", "400"],
    correct: 2,
  },
  {
    id: 80,
    q: "Стандарт хангаагүй бол хэдэн нэгжээр торгох вэ?",
    a: ["100", "200", "300", "400"],
    correct: 3,
  },
];

export default function TestScreen() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Санамсаргүй 20 асуулт сонгох
  const startQuiz = () => {
    const shuffled = [...QUESTIONS_DATABASE].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 20));
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
    setQuizStarted(true);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === currentQuestions[currentIndex].correct) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (currentIndex < currentQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 800);
  };

  // --- ЭХЛЭХ ХУУДАС ---
  if (!quizStarted) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.targetIcon}>
            <Ionicons name="medal-outline" size={70} color="#1a4371" />
          </View>
          <Text style={styles.title}>ХАБЭА-н Тест</Text>
          <Text style={styles.description}>
            80 асуултын сангаас санамсаргүй 20 асуулт сонгогдоно. Тэнцэх оноо:
            14+
          </Text>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>20</Text>
              <Text style={styles.statLabel}>Асуулт</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>14+</Text>
              <Text style={styles.statLabel}>Тэнцэх</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={startQuiz}>
            <Text style={styles.buttonText}>Тест эхлүүлэх</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- ТӨГСГӨЛ ХУУДАС (Confetti-тэй) ---
  if (isFinished) {
    const isPassed = score >= 14;
    return (
      <View style={styles.container}>
        {isPassed && (
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            fadeOut={true}
          />
        )}
        <View style={styles.card}>
          <Ionicons
            name={isPassed ? "ribbon-outline" : "sad-outline"}
            size={80}
            color={isPassed ? "#4CD964" : "#FF3B30"}
          />
          <Text style={styles.scoreTitle}>{score} / 20</Text>
          <Text style={styles.title}>
            {isPassed ? "Амжилттай тэнцлээ!" : "Харамсалтай нь тэнцсэнгүй"}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setQuizStarted(false)}
          >
            <Text style={styles.buttonText}>Дахин эхлэх</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- ТЕСТ ЯВАГДАЖ БУЙ ХЭСЭГ ---
  const currentQ = currentQuestions[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.quizHeader}>
        <View style={styles.headerInfo}>
          <Text style={styles.progressText}>
            Асуулт {currentIndex + 1} / 20
          </Text>
          <Text style={styles.scoreText}>Оноо: {score}</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((currentIndex + 1) / 20) * 100}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQ.q}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.optionsList}
        showsVerticalScrollIndicator={false}
      >
        {currentQ.a.map((option: string, index: number) => {
          let optionStyle = styles.optionButton;
          let textStyle = styles.optionText;

          if (selectedAnswer !== null) {
            if (index === currentQ.correct) {
              optionStyle = [styles.optionButton, styles.correctOption];
              textStyle = styles.whiteText;
            } else if (index === selectedAnswer) {
              optionStyle = [styles.optionButton, styles.wrongOption];
              textStyle = styles.whiteText;
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              <Text style={textStyle}>{option}</Text>
              {selectedAnswer !== null && index === currentQ.correct && (
                <Ionicons name="checkmark-circle" size={20} color="white" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fa",
    justifyContent: "center",
    padding: 25,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  targetIcon: {
    width: 100,
    height: 100,
    backgroundColor: "#f0f4f8",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a4371",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
    marginBottom: 30,
  },
  statRow: { flexDirection: "row", alignItems: "center", marginBottom: 35 },
  statItem: { alignItems: "center", paddingHorizontal: 20 },
  statNumber: { fontSize: 26, fontWeight: "bold", color: "#1a4371" },
  statLabel: { fontSize: 12, color: "#999" },
  divider: { width: 1, height: 30, backgroundColor: "#eee" },
  button: {
    backgroundColor: "#1a4371",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  // Quiz Header
  quizHeader: { marginTop: 40, marginBottom: 20 },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressText: { fontSize: 14, color: "#1a4371", fontWeight: "700" },
  scoreText: { fontSize: 14, color: "#4CD964", fontWeight: "700" },
  progressBarBg: { height: 6, backgroundColor: "#E0E0E0", borderRadius: 3 },
  progressBarFill: { height: 6, backgroundColor: "#1a4371", borderRadius: 3 },

  // Question Area
  questionCard: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
  },
  questionText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    lineHeight: 24,
  },
  optionsList: { paddingBottom: 30 },
  optionButton: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: { fontSize: 15, color: "#444", flex: 1 },
  correctOption: { backgroundColor: "#4CD964", borderColor: "#4CD964" },
  wrongOption: { backgroundColor: "#FF3B30", borderColor: "#FF3B30" },
  whiteText: { color: "#fff", fontWeight: "600" },
  scoreTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1a4371",
    marginBottom: 5,
  },
});
