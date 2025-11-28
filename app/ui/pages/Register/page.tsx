'use client';

import Image from "next/image";
import styles from "../../styles/Modules/input.module.css";
import buttonStyles from "../../styles/Modules/button.module.css";
import dividerStyles from "../../styles/Modules/divider.module.css";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRegister } from "@/interfaces/hooks/features/auth/use-register";

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        emailConfirm: '',
        name: '',
        phone: '',
        countryCode: '+57',
        password: '',
        confirmPassword: '',
        typeAccount: 'peopleNatural',
        acceptTerms: false,
        acceptPrivacy: false
    });

    const [error, setError] = useState('');
    const { mutate: register, isPending } = useRegister();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (formData.email !== formData.emailConfirm) {
            setError('Los emails no coinciden');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (!formData.acceptTerms || !formData.acceptPrivacy) {
            setError('Debes aceptar los términos y la política de privacidad');
            return;
        }

        const fullPhone = `${formData.countryCode}${formData.phone}`;

        register({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            phone: fullPhone,
            acceptTerms: formData.acceptTerms
        });
    };

    return (
        <div className="grid grid-cols-2 h-screen overflow-hidden">
            <div className="flex flex-col pl-30 pr-30 overflow-y-auto">

                <div className="flex-1 min-h-[10vh]"></div>

                <div className="flex flex-col justify-center py-8">
                    <div className="text-left mb-8">
                        <h1 className="text-4xl font-bold">Create an account</h1>
                        <p className="text-gray-600 mt-2">Enter your details to sign up</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500 font-bold text-[18px]">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className={styles.input}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="emailConfirm" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Email <span className="text-red-500 font-bold text-[18px]">*</span>
                            </label>
                            <input
                                type="email"
                                id="emailConfirm"
                                placeholder="Confirm your email"
                                className={styles.input}
                                value={formData.emailConfirm}
                                onChange={(e) => setFormData({ ...formData, emailConfirm: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name <span className="text-red-500 font-bold text-[18px]">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                className={styles.input}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number <span className="text-red-500 font-bold text-[18px]">*</span>
                            </label>
                            <div className="flex">
                                <div className="relative">
                                    <select
                                        id="countryCode"
                                        className="h-full border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                        value={formData.countryCode}
                                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                    >
                                        <option value="+57">🇨🇴 +57</option>
                                        <option value="+1">🇺🇸 +1</option>
                                        <option value="+52">🇲🇽 +52</option>
                                        <option value="+51">🇵🇪 +51</option>
                                        <option value="+56">🇨🇱 +56</option>
                                        <option value="+54">🇦🇷 +54</option>
                                        <option value="+55">🇧🇷 +55</option>
                                        <option value="+34">🇪🇸 +34</option>
                                        <option value="+44">🇬🇧 +44</option>
                                        <option value="+49">🇩🇪 +49</option>
                                        <option value="+33">🇫🇷 +33</option>
                                        <option value="+39">🇮🇹 +39</option>
                                    </select>
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="300 123 4567"
                                    className={`${styles.input} flex-1 rounded-l-none border-l-0`}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password <span className="text-red-500 font-bold text-[18px]">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Create a password"
                                className={styles.input}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password <span className="text-red-500 font-bold text-[18px]">*</span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                className={styles.input}
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="typeAccount" className="block text-sm font-medium text-gray-700 mb-1">
                                Account Type <span className="text-red-500 font-bold text-[18px]">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="typeAccount"
                                    className="h-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none w-full"
                                    value={formData.typeAccount}
                                    onChange={(e) => setFormData({ ...formData, typeAccount: e.target.value })}
                                >
                                    <option value="peopleNatural">People Natural</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex gap-1">
                                <input
                                    type="checkbox"
                                    id="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                />
                                <label htmlFor="acceptTerms">I accept the particular Terms of Use</label>
                            </div>
                            <div className="flex gap-1">
                                <input
                                    type="checkbox"
                                    id="acceptPrivacy"
                                    checked={formData.acceptPrivacy}
                                    onChange={(e) => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
                                />
                                <label htmlFor="acceptPrivacy">I accept the Privacy Policy</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`${buttonStyles.loginButton} mt-4`}
                            disabled={isPending}
                        >
                            {isPending ? 'Creating Account...' : 'Create Account Free'}
                        </button>
                    </form>

                    <div className={dividerStyles.dividerLogin + " my-6"}></div>

                    <p className="text-center text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/ui/pages/Login"
                            className="text-bt-color underline hover:text-bt-color-dark transition-colors"
                        >
                            Login here
                        </Link>
                    </p>
                </div>

                <div className="flex-1 min-h-[10vh]"></div>
            </div>

            <div className="relative h-screen w-full overflow-hidden">
                <Image
                    src="/Login/Login.jpeg"
                    fill
                    className="object-cover"
                    alt="Register"
                    priority
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </div>
        </div>
    );
}