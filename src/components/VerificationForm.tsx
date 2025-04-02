
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckIcon, LoaderCircle } from 'lucide-react';

interface VerificationFormProps {
  onVerify: (data: VerificationData) => void;
  isVerifying: boolean;
}

export interface VerificationData {
  idNumber: string;
  idType: string;
  fullName: string;
  dateOfBirth: string;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ onVerify, isVerifying }) => {
  const [formData, setFormData] = useState<VerificationData>({
    idNumber: '',
    idType: 'driver',
    fullName: '',
    dateOfBirth: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, idType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>ID Verification</CardTitle>
        <CardDescription>
          Enter the ID details to verify its authenticity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="idType">ID Type</Label>
            <Select 
              value={formData.idType} 
              onValueChange={handleSelectChange}
              disabled={isVerifying}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="driver">Driver's License</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="national">National ID</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="idNumber">ID Number</Label>
            <Input
              id="idNumber"
              name="idNumber"
              placeholder="Enter ID number"
              value={formData.idNumber}
              onChange={handleChange}
              required
              disabled={isVerifying}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name (as on ID)</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={isVerifying}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              disabled={isVerifying}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckIcon className="mr-2 h-4 w-4" />
                Verify ID
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerificationForm;
