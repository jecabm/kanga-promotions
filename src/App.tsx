import { Header } from './components/Header';
import { StructuredData } from './components/StructuredData';
import { QuoteProvider } from './context/QuoteContext';
import { Benefits } from './sections/Benefits';
import { Faq } from './sections/Faq';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { HowItWorks } from './sections/HowItWorks';
import { Products } from './sections/Products';
import { Quote } from './sections/Quote';

export default function App() {
  return (
    <QuoteProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <div id="top" />
        <Hero />
        <Products />
        <Benefits />
        <HowItWorks />
        <Faq />
        <Quote />
      </main>
      <Footer />
      <StructuredData />
    </QuoteProvider>
  );
}
