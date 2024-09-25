import React from 'react';
import { Helmet } from 'react-helmet';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="هذا الموقع خاص بمدافن أهالي الشوبك الغربي.يتم العمل على تسجيل وتنظيم حالات الوفيات الخاصة بأهالي القرية"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>مقابر الشوبك الغربي</title>
        <link rel="icon" href="/images/Home.svg" />
      </Helmet>
      <h2>Home</h2>
    </>
  );
}
