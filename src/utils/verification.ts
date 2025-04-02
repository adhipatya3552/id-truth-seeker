
import { VerificationData } from "../components/VerificationForm";

// This is a mock verification function
// In a real application, this would connect to an API or backend service
export const verifyID = (data: VerificationData): Promise<'genuine' | 'fake'> => {
  return new Promise((resolve) => {
    // Simulate network request
    setTimeout(() => {
      // For demo purposes, we'll determine if an ID is "fake" based on some simple rules
      // In a real app, this would use a more sophisticated algorithm or API
      
      const isFake = 
        // If ID number is too short
        data.idNumber.length < 6 ||
        // Or if name is too short
        data.fullName.length < 5 ||
        // Or if ID number contains only repeating digits
        /^(\d)\1+$/.test(data.idNumber) ||
        // Or randomly mark ~30% as fake for demonstration
        Math.random() < 0.3;
      
      resolve(isFake ? 'fake' : 'genuine');
    }, 2000); // Simulate a 2-second verification process
  });
};
