import { Phone } from 'lucide-react';
import registrationQR from '@/assets/registration-qr.png';

const SupportSection = () => {
  return (
    <section className="py-16 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Contact Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold gradient-text mb-6">
                    STUDENT COORDINATORS :
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="border-t border-border/50 pt-4">
                      <h4 className="text-lg font-semibold text-foreground">GUNN MALHOTRA</h4>
                      <a 
                        href="tel:9988066050" 
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-1"
                      >
                        <Phone className="w-4 h-4" />
                        <span>998 806 6050</span>
                      </a>
                    </div>
                    
                    <div className="border-t border-border/50 pt-4">
                      <h4 className="text-lg font-semibold text-foreground">MANJEET KUMAR</h4>
                      <a 
                        href="tel:6207782543" 
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-1"
                      >
                        <Phone className="w-4 h-4" />
                        <span>620 778 2543</span>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border/50 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">SPOC</span>
                    <a 
                      href="tel:8427203511" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>8427203511</span>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-xl">
                  <img 
                    src={registrationQR} 
                    alt="Registration QR Code" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold gradient-text">REGISTRATION LINK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
