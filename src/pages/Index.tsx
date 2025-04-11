
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VerificationForm, { VerificationData } from '@/components/VerificationForm';
import VerificationResult from '@/components/VerificationResult';
import { verifyID } from '@/utils/verification';
import { useToast } from "@/components/ui/use-toast";
import { ShieldCheck, ShieldAlert } from 'lucide-react';

const Index = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'genuine' | 'fake' | null>(null);
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const { toast } = useToast();

  const handleVerify = async (data: VerificationData) => {
    setIsVerifying(true);
    setVerificationData(data);
    
    try {
      const result = await verifyID(data);
      setVerificationResult(result);
      
      toast({
        title: result === 'genuine' ? 'Verification Successful' : 'Verification Failed',
        description: result === 'genuine' 
          ? 'The provided ID appears to be genuine.' 
          : 'The provided ID appears to be fake or contains incorrect information.',
        variant: result === 'genuine' ? 'default' : 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Verification Error',
        description: 'An error occurred during verification. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setVerificationData(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Verify ID Documents In Seconds
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our advanced verification system helps you detect fake IDs quickly and accurately.
                Simply enter the ID details below to get started.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {verificationResult && verificationData ? (
                <VerificationResult 
                  result={verificationResult} 
                  data={verificationData}
                  onReset={resetVerification}
                />
              ) : (
                <VerificationForm 
                  onVerify={handleVerify} 
                  isVerifying={isVerifying} 
                />
              )}
            </div>
          </div>
        </section>
        
        <section className="py-10 bg-secondary">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center mb-8">
              How Our Verification Works
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h4 className="text-xl font-medium mb-2">Enter ID Details</h4>
                <p className="text-muted-foreground">
                  Submit the required information from the ID document you want to verify.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h4 className="text-xl font-medium mb-2">Automated Analysis</h4>
                <p className="text-muted-foreground">
                  Our system analyzes the information against our database and verification algorithms.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h4 className="text-xl font-medium mb-2">Get Results</h4>
                <p className="text-muted-foreground">
                  Receive instant verification results showing whether the ID is genuine or fake.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
