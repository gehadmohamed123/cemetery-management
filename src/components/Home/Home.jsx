import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './HomePage.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom'; 

export default function HomePage() {
  const [recentBurials, setRecentBurials] = useState([]);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecentBurials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/graves/recentBurials');
        setRecentBurials(response.data);
      } catch (error) {
        console.error('Error fetching recent burials:', error);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles');
        setArticles(response.data);
      } catch (err) {
        setError('حدث خطأ أثناء جلب المقالات.');
      }
    };

    fetchRecentBurials();
    fetchArticles();
  }, []);

  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="هذا الموقع خاص بمدافن أهالي الشوبك الغربي. يتم العمل على تسجيل وتنظيم حالات الوفيات الخاصة بأهالي القرية"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>مقابر الشوبك الغربي</title>
        <link rel="icon" href="/images/Home.svg" />
      </Helmet>
      <main class="landing">
        <div className="overlay"></div>
        <div className="text-box">
          <div className="content">
            <h1>مرحباً بكم فى<br/>موقع مقابر الشوبك الغربي</h1>
            <p>أهلاً بكم معشر الأحياء .. كنا في يوم من الأيام بينكم، نتسامر أطراف الحديث، نضحك ونبكي، نغدو ونروح، نأكل
              ونشرب، لكن شاء الله أن نسبقكم إلى دار الاخرة، لاتحزنو كثيرا، فهذه سنة الله في خلقه، نحن السابقون وأنتم اللاحقون .. ننتظركم هنا.<br/>
              وحتى يختم الله لكم على خير، نسألكم الدعاء لنا، والتصدق باسمنا، قد يبدو الأمر يسيراً عليكم، لكن للأمر أثر جليل هنا، فلا تغفلوا عنا واجعلونا دائما في ذكراكم.<br/>
              شكراً على هذه الزيارة الطيبة، <span>نسألكم الدعاء لنا ولجميع أموات المسلمين.</span></p>
          </div>
        </div>
      </main>

      <div class="services">
        <div class="container">
          <div class="main-heading">
            <h2>الخدمات</h2>
            <p>يعمل الموقع على تنظيم عملية الدفن، ومعرفة حالة كل عين داخل المقابر (فارغة - ممتلئة). كما يسعى إلى حفظ بيانات المتوفيين والرجوع لها في أي وقت.</p>
          </div>
          <div class="sections">
            <Link to="/man">
              <section class="box">
                <h3>مدافن الرجال</h3>
                <p>يحتوي قسم مدافن الرجال على أسماء جميع الرجال الذين توفاهم الله من قرية الشوبك الغربي.</p>
              </section>
            </Link>
            <Link to="/woman">
              <section class="box">
                <h3>مدافن النساء</h3>
                <p>يحتوي قسم مدافن النساء على أسماء جميع النساء الذين توفاهم الله من قرية الشوبك الغربي.</p>
              </section>
            </Link>
            <Link to="/bones">
              <section class="box">
                <h3>مدافن العظام</h3>
                <p>يحتوي قسم مدافن العظام على أسماء جميع الرجال والنساء الذين توفاهم الله وتم نقل رفاتهم الى مدافن العظام.</p>
              </section>
            </Link>
          </div>
        </div>
      </div>

      <div className="home-container">
        <h2 style={{ textAlign: 'center' }}>وفيات آخر ثلاث أيام</h2>
        <div className="burials-cards">
          {recentBurials.map((grave) => (
            <div key={grave._id} className="burial-card">
              {grave.buriedPersons.map((person) => (
                <div key={person._id} className="buried-person">
                  <img src="https://via.placeholder.com/60" alt="Avatar" className="avatar" />
                  <div className="person-info">
                    <h3>اسم المتوفى: {person.name}</h3>
                    <p>تاريخ الدفن: {new Date(person.burialDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div class="protfolio">
        <div class="container">
          <div class="main-heading">
            <h2 class="after">حداد</h2>
            <p>خالص العزاء والمواساه لأهل الفقيد <br/>نسأل الله تعالى أن يتغمده بواسع رحمته وأن يلهم أهله وذويه الصبر والسلوان</p>
          </div>
        </div>
      </div>
      <article className="articles-container">
  <div className="container">
    <div className="main-heading">
      <h2>مقالات</h2>
      <p>مجموعة من المقالات المبسطة تحتوي على بعض المعلومات <br/> بهدف التوعية ونشر الثقافة الصحيحة بهذا الشأن.</p>
    </div>
    <div className="articles">
      {error && <p className="error">{error}</p>}
      {articles.length === 0 ? (
        <p>لا توجد مقالات حتى الآن.</p>
      ) : (
        articles.map((article) => (
          <a href={`/ArticleDetail/${article._id}`} key={article._id}>
            <div className="article-card">
              <h2>{article.title}</h2>
            </div>
          </a>
        ))
      )}
    </div>
  </div>
</article>


      <div class="about">
    <div class="container">
      <div class="main-heading">
        <h2 class="after">عنا</h2>
        <p>تم تصميم هذا الموقع بواسطة شركة <a href="#">السنوطى للبرمجة Web</a>، ويعد هذا الموقع صدقة جارية على روح
          المرحوم
          <span>محمد رضا
            السنوطى</span> نسأل الله تعالى أن يتغمده بواسع رحمته
        </p>
      </div>
    </div>
  </div>
    </>
  );
}
