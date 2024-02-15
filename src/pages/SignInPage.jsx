import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div className="w-full flex justify-center pt-[60px]">
      <SignIn />
    </div>
  );
}
