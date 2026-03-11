import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name is required for Pickup'),
  phone: z.string().min(10, 'Valid phone number is required'),
});

const ContactForm = ({ onChange }) => {
  const { register, watch, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onChange'
  });

  const formData = watch();

  useEffect(() => {
    if (isValid) {
      onChange(formData);
    } else {
      onChange(null);
    }
  }, [formData.email, formData.name, formData.phone, isValid]);

  return (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-black/5 mb-8">
      <h2 className="text-lg font-semibold tracking-tight mb-6 flex items-center gap-3">
        <span className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xs">1</span>
        Contact Information
      </h2>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Full Name *"
            {...register('name')}
            className="w-full border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-brand-gold transition-colors text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address *"
            {...register('email')}
            className="w-full border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-brand-gold transition-colors text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number *"
            {...register('phone')}
            className="w-full border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-brand-gold transition-colors text-sm"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
