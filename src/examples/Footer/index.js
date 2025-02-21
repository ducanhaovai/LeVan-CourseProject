import { useTranslation } from 'react-i18next';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import brand from 'assets/images/logos/logoLevan.png';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 text-gray-800 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 px-4">
        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold uppercase">{t('footer.contactTitle')}</h3>
          <p className="text-sm">{t('footer.contactAddress')}</p>
          <p className="text-sm">{t('footer.contactPhone')}</p>
          <p className="text-sm">{t('footer.contactEmail')}</p>
        </div>

        {/* Logo + Social Media */}
        <div className="flex flex-col items-center space-y-4">
          <img src={brand} alt="Le Van Logo" className="w-32" />
          <p className="text-sm text-center">{t('footer.discoverSlogan')}</p>
          {/* Social Media Icons */}
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold uppercase">{t('footer.servicesTitle')}</h3>
          <ul className="text-sm space-y-2">
            {t('footer.servicesList', { returnObjects: true }).map((service, index) => (
              <li key={index}><a href="#">{service}</a></li>
            ))}
          </ul>
          <h3 className="text-lg font-bold uppercase">{t('footer.coursesTitle')}</h3>
          <ul className="text-sm space-y-2">
            {t('footer.coursesList', { returnObjects: true }).map((course, index) => (
              <li key={index}><a href="#">{course}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
