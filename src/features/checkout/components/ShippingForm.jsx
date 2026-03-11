import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().optional(),
  phone: z.string().min(1, 'Phone number is required'),
});

const ShippingForm = ({ onChange }) => {
  const { register, watch, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(shippingSchema),
    mode: 'onChange'
  });

  const formData = watch();

  useEffect(() => {
    if (isValid) {
      onChange(formData);
    } else {
      onChange(null);
    }
  }, [formData, isValid, onChange]);

  return (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-black/5 mb-8">
      <h2 className="text-lg font-semibold tracking-tight mb-6 flex items-center gap-3">
        <span className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xs">2</span>
        Shipping Address
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="First Name *"
            {...register('firstName')}
            className="w-full border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-brand-gold transition-colors text-sm"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name *"
            {...register('lastName')}
            className="w-full border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-brand-gold transition-colors text-sm"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Flat/House No, Street Address *"
            {...register('address')}
            className="w-full border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-brand-gold transition-colors text-sm"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="City/Town *"
            {...register('city')}
            className="w-full border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-brand-gold transition-colors text-sm"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="State *"
            {...register('state')}
            className="w-full border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-brand-gold transition-colors text-sm"
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
        </div>
        <div className="col-span-2">
          <input
            type="tel"
            placeholder="Phone Number for Delivery *"
            {...register('phone')}
            className="w-full border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-brand-gold transition-colors text-sm"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
