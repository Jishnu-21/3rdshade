'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VideoBackground from '@/components/VideoBackground';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';

export default function Register() {
  const [step, setStep] = useState(1); // 1 for registration form, 2 for OTP verification
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFirstStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Send OTP
      const otpRes = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, action: 'register' }),
      });

      if (!otpRes.ok) throw new Error('Failed to send OTP');
      
      setStep(2); // Move to OTP verification step
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Verify OTP
      const otpRes = await fetch('/api/auth/otp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          otp, 
          action: 'register' 
        }),
      });

      if (!otpRes.ok) throw new Error('Invalid OTP');

      // Register user
      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await registerRes.json();
      if (!registerRes.ok) throw new Error(data.error);

      // Auto login after registration
      const loginResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (loginResult?.error) {
        throw new Error(loginResult.error);
      }

      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Automatically sign in after successful registration
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError(signInResult.error);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  return (
    <motion.div className="fixed inset-0 overflow-hidden">
      <VideoBackground />
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <Link href="/">
          <Image 
            src="/logo png-03 1.png" 
            alt="3rdshade Logo" 
            width={200} 
            height={53} 
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-8 rounded-xl backdrop-blur-md bg-transparent border border-white/50 shadow-xl">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
              {step === 1 ? 'Create your account' : 'Verify your email'}
            </h2>
          </div>

          {error && (
            <div className="rounded-md bg-red-50/80 backdrop-blur-sm p-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          {step === 1 ? (
            <form className="mt-8 space-y-6" onSubmit={handleFirstStep}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-t-md relative block w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="appearance-none relative block w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-b-md relative block w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div>
              <div className="text-center mt-8 text-sm text-white">
                <Link href="/login" className="hover:text-gray-200 transition-colors">
                  Already have an account? Login
                </Link>
              </div>
            </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70"
              >
                {isLoading ? 'Creating account...' : 'Next'}
              </button>
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
              <div>
                <label htmlFor="otp" className="sr-only">OTP</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70"
              >
                {isLoading ? 'Verifying...' : 'Complete Registration'}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
