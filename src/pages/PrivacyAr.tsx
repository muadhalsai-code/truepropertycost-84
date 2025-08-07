import { Calendar, Shield, Scale, User, MapPin, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import logo from "@/assets/logo.png";

const PrivacyAr = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="ml-4">
                <h1 className="text-3xl font-bold">
                  حاسبة التكلفة الحقيقية <span className="text-accent">للعقارات</span>
                </h1>
                <p className="text-primary-foreground/80">سياسة الخصوصية وحماية البيانات</p>
              </div>
              <img src={logo} alt="True Property Cost Calculator" className="h-16 w-auto" />
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">تاريخ السريان: 20 يوليو 2024</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1 h-full bg-primary"></div>
          <CardContent className="p-8 md:p-12">
            {/* مقدمة */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pr-4 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                مقدمة
              </h2>
              <p className="text-muted-foreground mb-4">
                تقوم شركة حاسبة التكلفة الحقيقية للعقارات ("نحن" أو "لنا" أو "خاصتنا") بتشغيل الموقع الإلكتروني https://truepropertycostcalculator.com/ ("الخدمة"). نحن ملتزمون بحماية خصوصيتك والتعامل مع معلوماتك الشخصية وفقاً لقانون حماية البيانات في دولة الإمارات العربية المتحدة (المرسوم بقانون اتحادي رقم 45 لسنة 2021) واللوائح المعمول بها الأخرى.
              </p>
              
              <div className="bg-primary/10 border-r-4 border-primary p-6 rounded-l-lg">
                <p className="font-medium">
                  <strong>المبدأ الأساسي:</strong> نحن نجمع الحد الأدنى من البيانات الشخصية المطلوبة لتقديم خدمات حساب تكلفة العقارات. يتم تخزين معلوماتك بشكل آمن ولا يتم بيعها مطلقاً لأطراف ثالثة.
                </p>
              </div>
            </section>

            {/* المعلومات التي نجمعها */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pr-4 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                المعلومات التي نجمعها
              </h2>
              <p className="text-muted-foreground mb-4">
                لتقديم حسابات دقيقة لتكلفة العقارات في دولة الإمارات العربية المتحدة، نقوم بجمع:
              </p>
              <ul className="list-none space-y-2 mr-6">
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  <strong>معلومات العقار:</strong> الموقع ونوع العقار والقيمة والحجم وتفاصيل أخرى تدخلها لأغراض الحساب
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  <strong>البيانات التقنية:</strong> عنوان IP ونوع المتصفح ومعلومات الجهاز وأنماط الاستخدام
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  <strong>بيانات الحساب الاختيارية:</strong> إذا قمت بإنشاء حساب، نجمع الاسم وعنوان البريد الإلكتروني وكلمة المرور المشفرة
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  <strong>بيانات التواصل:</strong> إذا تواصلت معنا، قد نحتفظ بمعلومات المراسلة
                </li>
              </ul>
            </section>

            {/* كيف نستخدم معلوماتك */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pr-4 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                كيف نستخدم معلوماتك
              </h2>
              <p className="text-muted-foreground mb-4">
                نستخدم المعلومات المجمعة حصرياً لـ:
              </p>
              <ul className="list-none space-y-2 mr-6">
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  تقديم حسابات دقيقة لتكلفة العقارات في دولة الإمارات العربية المتحدة
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  تحسين خوارزميات الحاسبة وتجربة المستخدم
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  الرد على الاستفسارات وتقديم دعم العملاء
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  إرسال اتصالات متعلقة بالخدمة (إذا اخترت ذلك)
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  الامتثال للالتزامات القانونية واللوائح الإماراتية
                </li>
              </ul>
            </section>

            {/* شارة الامتثال الإماراتي */}
            <div className="bg-muted/50 p-6 rounded-lg flex items-start gap-4 mb-8">
              <Scale className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">الامتثال لحماية البيانات في دولة الإمارات</h3>
                <p className="text-muted-foreground">
                  تمتثل ممارسات الخصوصية لدينا بالكامل لقانون حماية البيانات الإماراتي المرسوم بقانون اتحادي رقم 45 لسنة 2021. نحن نلتزم بمبادئ تقليل البيانات وتحديد الغرض والأمان المطلوبة بموجب القانون الإماراتي.
                </p>
              </div>
            </div>

            {/* الأساس القانوني للمعالجة */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pr-4 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                الأساس القانوني للمعالجة (الامتثال الإماراتي)
              </h2>
              <p className="text-muted-foreground mb-4">
                بموجب القانون الإماراتي، نقوم بمعالجة بياناتك بناءً على:
              </p>
              <ul className="list-none space-y-2 mr-6">
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  <strong>الموافقة:</strong> عندما تقدم المعلومات طوعياً للحسابات
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  <strong>الضرورة التعاقدية:</strong> لتقديم الخدمات التي تطلبها
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  <strong>الالتزام القانوني:</strong> للامتثال للمتطلبات التنظيمية الإماراتية
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  <strong>المصالح المشروعة:</strong> لتحسين الخدمة والأمان، متوازنة مع حقوقك
                </li>
              </ul>
            </section>

            {/* مشاركة البيانات والإفصاح */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pr-4 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                مشاركة البيانات والإفصاح
              </h2>
              <p className="text-muted-foreground mb-4">
                نحن لا نبيع بياناتك الشخصية. تحدث المشاركة المحدودة فقط مع:
              </p>
              <ul className="list-none space-y-2 mr-6">
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  مقدمي الخدمات الذين يساعدون في تشغيل موقعنا (تحت اتفاقيات سرية صارمة)
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  السلطات القانونية عند الطلب بموجب القانون الإماراتي أو لحماية حقوقنا
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  مستلمي النقل التجاري في حالة الاندماج أو الاستحواذ، مع إشعار مسبق
                </li>
              </ul>
            </section>

            {/* حقوقك */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pr-4 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                حقوقك بموجب القانون الإماراتي
              </h2>
              <p className="text-muted-foreground mb-4">
                لديك الحق في:
              </p>
              <ul className="list-none space-y-2 mr-6 mb-6">
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  الوصول إلى معلوماتك الشخصية
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  تصحيح البيانات غير الدقيقة
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  طلب حذف بياناتك
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  سحب الموافقة على المعالجة
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  الاعتراض على أنشطة معالجة معينة
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  طلب نقل البيانات (حيثما ينطبق)
                </li>
                <li className="relative">
                  <span className="absolute -right-6 text-primary font-bold">•</span>
                  تقديم شكاوى لسلطات حماية البيانات الإماراتية
                </li>
              </ul>
              
              <div className="bg-primary/10 border-r-4 border-primary p-6 rounded-l-lg">
                <p className="font-medium">
                  <strong>لممارسة هذه الحقوق</strong>، يرجى الاتصال بمسؤول حماية البيانات لدينا باستخدام المعلومات أدناه. نحن نرد على جميع الطلبات المشروعة في غضون 30 يوماً كما يتطلب القانون الإماراتي.
                </p>
              </div>
            </section>

            {/* معلومات الاتصال */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pr-4 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                اتصل بنا
              </h2>
              <p className="text-muted-foreground mb-6">
                للاستفسارات المتعلقة بالخصوصية أو لممارسة حقوقك:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      مسؤول حماية البيانات
                    </h3>
                    <p className="text-muted-foreground mb-2">البريد الإلكتروني: dpo@truepropertycostcalculator.com</p>
                    <p className="text-muted-foreground">الهاتف: +971 4 123 4567</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      المكتب المسجل
                    </h3>
                    <p className="text-muted-foreground mb-1">شركة حاسبة التكلفة الحقيقية للعقارات ذ.م.م</p>
                    <p className="text-muted-foreground mb-1">مدينة دبي للإنترنت</p>
                    <p className="text-muted-foreground mb-1">المبنى 12، المكتب 301</p>
                    <p className="text-muted-foreground">دبي، الإمارات العربية المتحدة</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button onClick={handlePrint} className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                طباعة هذه السياسة
              </Button>
            </section>
          </CardContent>
        </Card>
      </div>

      {/* الذيل */}
      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2024 حاسبة التكلفة الحقيقية للعقارات. جميع الحقوق محفوظة.</p>
          <p className="text-primary-foreground/80 mb-4">
            متوافق مع المرسوم بقانون اتحادي رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية بدولة الإمارات
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="/" className="text-accent hover:underline">الرئيسية</a>
            <a href="/privacy" className="text-accent hover:underline">English</a>
            <a href="#" className="text-accent hover:underline">شروط الخدمة</a>
            <a href="#" className="text-accent hover:underline">سياسة الكوكيز</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyAr;