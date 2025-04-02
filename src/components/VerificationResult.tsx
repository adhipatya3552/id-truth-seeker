
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, ShieldX, ShieldCheck, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VerificationData } from './VerificationForm';

interface VerificationResultProps {
  result: 'genuine' | 'fake' | null;
  data: VerificationData;
  onReset: () => void;
}

const VerificationResult: React.FC<VerificationResultProps> = ({
  result,
  data,
  onReset
}) => {
  if (!result) return null;

  return (
    <Card className={`w-full max-w-md mx-auto border-2 ${
      result === 'genuine' ? 'border-success' : 'border-destructive'
    }`}>
      <CardHeader className={`${
        result === 'genuine' ? 'bg-success/10' : 'bg-destructive/10'
      }`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Verification Result</CardTitle>
          {result === 'genuine' ? (
            <ShieldCheck className="h-8 w-8 text-success" />
          ) : (
            <ShieldX className="h-8 w-8 text-destructive" />
          )}
        </div>
        <CardDescription>
          ID verification {result === 'genuine' ? 'passed' : 'failed'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6 flex justify-center">
          {result === 'genuine' ? (
            <div className="p-4 bg-success/10 rounded-full">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
          ) : (
            <div className="p-4 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-16 w-16 text-destructive" />
            </div>
          )}
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-2">
            <p className="text-muted-foreground">ID Type:</p>
            <p className="font-medium">
              {data.idType === 'driver' ? "Driver's License" : 
               data.idType === 'passport' ? "Passport" :
               data.idType === 'national' ? "National ID" : "Other"}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <p className="text-muted-foreground">ID Number:</p>
            <p className="font-medium">{data.idNumber}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <p className="text-muted-foreground">Full Name:</p>
            <p className="font-medium">{data.fullName}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <p className="text-muted-foreground">Date of Birth:</p>
            <p className="font-medium">{data.dateOfBirth}</p>
          </div>
        </div>

        <div className="flex items-center p-4 mt-6 bg-secondary rounded-md">
          <InfoIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className="text-sm">
            {result === 'genuine' 
              ? "This ID appears to be genuine based on our verification system." 
              : "This ID appears to be fake or contains incorrect information."}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onReset}
          variant="outline" 
          className="w-full"
        >
          Verify Another ID
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationResult;
