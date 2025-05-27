"use client";

import Link from "next/link";
import {
  Search,
  Calendar,
  Users,
  Phone,
  MapPin,
  Clock,
  Shield,
  Star,
  Heart,
  Stethoscope,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

const clinics = [
  {
    name: "Metro General Hospital",
    specialty: "General Medicine",
    rating: 4.8,
    reviews: 245,
    address: "123 Healthcare Blvd, Downtown",
    phone: "(555) 123-4567",
    hours: "24/7",
    waitTime: "15 min",
    image: "clinic1.jpg",
    emergency: true,
    doctors: [
      {
        name: "Dr. Sarah Johnson",
        specialty: "Internal Medicine",
        image: "",
        rating: 4.9,
        available: true,
      },
      {
        name: "Dr. Michael Chen",
        specialty: "Emergency Medicine",
        image: "",
        rating: 4.7,
        available: true,
      },
      {
        name: "Dr. Robert Williams",
        specialty: "Cardiology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.8,
        available: false,
      },
    ],
  },
  {
    name: "Family Care Center",
    specialty: "Family Practice",
    rating: 4.6,
    reviews: 189,
    address: "456 Wellness Ave, Midtown",
    phone: "(555) 234-5678",
    hours: "8:00 AM - 8:00 PM",
    waitTime: "20 min",
    image: "clinic2.jpg",
    doctors: [
      {
        name: "Dr. Emily Rodriguez",
        specialty: "Family Medicine",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.8,
        available: true,
      },
      {
        name: "Dr. James Wilson",
        specialty: "Pediatrics",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.9,
        available: true,
      },
      {
        name: "Dr. Lisa Thompson",
        specialty: "Family Medicine",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.7,
        available: true,
      },
    ],
  },
  {
    name: "Children's Health Clinic",
    specialty: "Pediatrics",
    rating: 4.9,
    reviews: 312,
    address: "789 Kids Way, Northside",
    phone: "(555) 345-6789",
    hours: "7:00 AM - 7:00 PM",
    waitTime: "10 min",
    image: "clinic3.jpg",
    doctors: [
      {
        name: "Dr. Amanda Lee",
        specialty: "Pediatrics",
        image: "/placeholder.svg?height=100&width=100",
        rating: 5.0,
        available: true,
      },
      {
        name: "Dr. David Kim",
        specialty: "Pediatric Neurology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.8,
        available: false,
      },
      {
        name: "Dr. Jessica Martinez",
        specialty: "Pediatric Cardiology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.9,
        available: true,
      },
    ],
  },
  {
    name: "Heart & Wellness Center",
    specialty: "Cardiology",
    rating: 4.7,
    reviews: 156,
    address: "321 Heart Lane, Eastside",
    phone: "(555) 456-7890",
    hours: "9:00 AM - 6:00 PM",
    waitTime: "25 min",
    image: "clinic4.jpg",
    doctors: [
      {
        name: "Dr. Thomas Wright",
        specialty: "Cardiology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.7,
        available: true,
      },
      {
        name: "Dr. Patricia Garcia",
        specialty: "Interventional Cardiology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.8,
        available: true,
      },
      {
        name: "Dr. Richard Taylor",
        specialty: "Electrophysiology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.6,
        available: false,
      },
    ],
  },
  {
    name: "Women's Health Institute",
    specialty: "OB/GYN",
    rating: 4.8,
    reviews: 203,
    address: "654 Care Street, Westside",
    phone: "(555) 567-8901",
    hours: "8:00 AM - 6:00 PM",
    waitTime: "18 min",
    image: "clinic5.jpg",
    doctors: [
      {
        name: "Dr. Jennifer Adams",
        specialty: "Obstetrics & Gynecology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.9,
        available: true,
      },
      {
        name: "Dr. Sophia Patel",
        specialty: "Reproductive Endocrinology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.8,
        available: true,
      },
      {
        name: "Dr. Elizabeth Brown",
        specialty: "Gynecologic Oncology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.7,
        available: true,
      },
    ],
  },
  {
    name: "Urgent Care Express",
    specialty: "Urgent Care",
    rating: 4.5,
    reviews: 128,
    address: "987 Quick Care Dr, Southside",
    phone: "(555) 678-9012",
    hours: "24/7",
    waitTime: "30 min",
    image: "clinic6.jpg",
    emergency: true,
    doctors: [
      {
        name: "Dr. John Miller",
        specialty: "Emergency Medicine",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.6,
        available: true,
      },
      {
        name: "Dr. Rachel Scott",
        specialty: "Urgent Care",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.5,
        available: true,
      },
      {
        name: "Dr. Kevin Anderson",
        specialty: "Family Medicine",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.4,
        available: true,
      },
    ],
  },
];

const features = [
  {
    icon: <Search className="h-12 w-12 text-green-600" />,
    title: "Найти медицинских специалистов",
    description:
      "Найдите нужную клинику или специалиста в нашей широкой сети проверенных медицинских учреждений — по адресу, профилю или доступным услугам.",
  },
  {
    icon: <Calendar className="h-12 w-12 text-green-600" />,
    title: "Лёгкое и удобное бронирование приёма",
    description:
      "Бронируйте приёмы онлайн с актуальным расписанием. Подтверждение и напоминания приходят сразу.",
  },
  {
    icon: <Clock className="h-12 w-12 text-green-600" />,
    title: "Время ожидания в режиме реального времени",
    description:
      "Проверяйте время ожидания в клиниках заранее, чтобы спланировать визит и избежать лишнего ожидания.",
  },
  {
    icon: <Shield className="h-12 w-12 text-green-600" />,
    title: "Надёжная защита ваших медицинских записей",
    description:
      "Безопасный доступ к вашей медицинской истории, результатам анализов и назначениям. Мгновенно делитесь информацией с врачами.",
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 shadow-sm dark:border-gray-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-green-600 dark:text-green-500" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              HealthConnect
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors"
            >
              Главная страница
            </Link>
            <Link
              href="#features"
              className="hidden lg:flex text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              Возможности
            </Link>
            <Link
              href="#clinics"
              className="hidden lg:flex text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              Найти клинику
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              Для клиник
            </Link>
            <Link
              href="#"
              className="hidden lg:flex text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              О нас
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden md:flex border-green-600 dark:border-green-500 text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-950"
              onClick={() => router.push("/sign-in")}
            >
              Войти
            </Button>
            <Button
              className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white"
              onClick={() => router.push("/sign-up")}
            >
              Начать
            </Button>
          </div>
        </div>
      </header>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="pb-12">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-green-950 dark:via-gray-900 dark:to-green-950">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="flex flex-col justify-center space-y-6">
                  <div className="space-y-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none w-fit">
                      🏥 Надёжная медицинская сеть
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl dark:text-white">
                      Ваше Здоровье,
                    </h1>
                    <span className="text-green-600 dark:text-green-500 text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                      Наш Приоритет!
                    </span>
                    <p className="max-w-[600px] text-gray-600 dark:text-gray-300 text-lg md:text-xl">
                      Здесь здоровье становится удобным и доступным.
                      Записывайтесь на приём, получайте рекомендации врачей,
                      храните медицинские документы и следите за своим
                      самочувствием — всё в одном приложении.Мы объединяем
                      технологии и заботу, чтобы вы чувствовали себя уверенно и
                      безопасно каждый день.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 min-[400px]:flex-row">
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Найти Клинику
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                    >
                      Записаться На Приём
                    </Button>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>500+ Проверенных Клиник</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Экстренная медицинская помощь 24/7</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 to-green-200 p-8">
                    <img
                      src="/placeholder.svg?height=400&width=400"
                      alt="Healthcare professionals"
                      className="object-cover w-full h-full rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Emergency Banner */}
          <section className="w-full py-4 bg-red-600 text-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-center">
                <Heart className="h-6 w-6 text-white" />
                <p className="text-lg font-medium">
                  Экстренная ситуация? Позвоните 1234 или немедленно обратитесь
                  в ближайшую больницу или клинику.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-black hover:bg-red-700 hover:text-white"
                >
                  Найти ближайший пункт экстренной помощи
                </Button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="w-full py-12 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                  Platform Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Всё, что нужно для заботы о вашем здоровье!
                </h2>
                <p className="max-w-[900px] text-gray-600 text-lg">
                  Наша платформа соединяет пациентов с медицинскими
                  специалистами с помощью современных технологий и широкого
                  спектра услуг.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="border-gray-200 hover:border-green-200 transition-all hover:shadow-lg"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 p-3 bg-green-50 rounded-full w-fit">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Clinics Section */}
          <section id="clinics" className="w-full py-12 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                  Медицинская сеть
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Найдите надёжную медицинскую помощь поблизости
                </h2>
                <p className="max-w-[900px] text-gray-600 text-lg">
                  Просматривайте нашу сеть надёжных медицинских специалистов и
                  выбирайте подходящую клинику для своих нужд.
                </p>
                <div className="w-full max-w-md">
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Ищите по адресу, имени врача или названию клиники"
                      className="w-full pl-10 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinics.map((clinic, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-gray-200 hover:border-green-200 transition-all hover:shadow-lg"
                  >
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      <img
                        src={clinic.image || "/placeholder.svg"}
                        alt={clinic.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {clinic.name}
                          </CardTitle>
                          <CardDescription className="text-green-600 font-medium">
                            {clinic.specialty}
                          </CardDescription>
                        </div>
                        {clinic.emergency && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            Emergency
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-green-500 text-green-500" />
                        <span className="font-medium">{clinic.rating}</span>
                        <span className="text-gray-500">
                          ({clinic.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span>{clinic.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span>{clinic.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>{clinic.hours}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Wait: {clinic.waitTime}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Updated 5 min ago
                        </span>
                      </div>

                      {/* Doctors Section */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Our Doctors
                        </h4>
                        <Tabs defaultValue="available" className="w-full">
                          <TabsList className="grid w-full grid-cols-2 mb-3">
                            <TabsTrigger value="available">
                              Available Now
                            </TabsTrigger>
                            <TabsTrigger value="all">All Doctors</TabsTrigger>
                          </TabsList>
                          <TabsContent value="available" className="space-y-3">
                            {clinic.doctors
                              .filter((doctor) => doctor.available)
                              .map((doctor, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 border border-green-100">
                                      <AvatarImage
                                        src={doctor.image || "/placeholder.svg"}
                                        alt={doctor.name}
                                      />
                                      <AvatarFallback className="bg-green-100 text-green-700">
                                        {doctor.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        {doctor.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {doctor.specialty}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                                    Available
                                  </Badge>
                                </div>
                              ))}
                            {clinic.doctors.filter((doctor) => doctor.available)
                              .length === 0 && (
                              <p className="text-sm text-gray-500 text-center py-2">
                                No doctors currently available
                              </p>
                            )}
                          </TabsContent>
                          <TabsContent value="all" className="space-y-3">
                            {clinic.doctors.map((doctor, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8 border border-green-100">
                                    <AvatarImage
                                      src={doctor.image || "/placeholder.svg"}
                                      alt={doctor.name}
                                    />
                                    <AvatarFallback className="bg-green-100 text-green-700">
                                      {doctor.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {doctor.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {doctor.specialty}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                  <span className="text-xs font-medium">
                                    {doctor.rating}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </TabsContent>
                        </Tabs>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          View All Doctors{" "}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Book Appointment
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full py-12 md:py-24 bg-green-600 text-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-10 lg:grid-cols-2 items-start">
                <div className="flex flex-col justify-center space-y-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                    Станьте частью нашей медицинской сети
                  </h2>
                  <p className="text-base sm:text-lg text-green-100">
                    Вы медицинский специалист? Свяжитесь с пациентами в вашем
                    регионе и развивайте свою практику с помощью нашей удобной и
                    функциональной платформы.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      className="bg-white text-green-600 hover:bg-gray-100 w-full sm:w-auto"
                    >
                      Зарегистрируйте Свою Клинику
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                    >
                      Узнать больше
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="bg-white/10 border border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">
                        Преимущества для специалистов
                      </CardTitle>
                      <CardDescription className="text-green-100 text-sm">
                        Почему медицинские специалисты выбирают нашу платформу?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 mt-1 text-white" />
                        <span className="text-white text-sm">
                          Больше пациентов и выше видимость вашей практики
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 mt-1 text-white" />
                        <span className="text-white text-sm">
                          Быстрое и удобное управление приёмами
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 mt-1 text-white" />
                        <span className="text-white text-sm">
                          Надёжное управление данными пациентов
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold text-gray-900">
                  HealthConnect
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Связываем пациентов с квалифицированными медицинскими
                специалистами для улучшения здоровья и доступности медицинской
                помощи.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Для специалистов
              </h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  Найти клинику
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  Записаться на приём
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  Экстренная медицинская помощь
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  Медицинская история
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Для специалистов
              </h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  Присоединитесь к нам
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  Панель управления специалиста
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  Ресурсы
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  Поддержка
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Контакты</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span>
                    Узбекистан, город Ташкент, Алмазарский район, улица Себсор,
                    17/18
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>+998 (97) 711-29-99</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>support@abubakrqobil.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                © © 2024 HealthConnect. Все права защищены.
              </p>
              <div className="flex gap-6 text-sm text-gray-600">
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  Политика конфиденциальности
                </Link>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  Условия обслуживания
                </Link>
                <Link
                  href="#"
                  className="hover:text-green-600 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
