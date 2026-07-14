import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import NoorNikah, { buildPublicProfile } from '../NoorNikah'

test('renders the home route heading', () => {
  window.scrollTo = vi.fn()
  render(<MemoryRouter initialEntries={['/']}><NoorNikah /></MemoryRouter>)
  expect(screen.getByRole('heading', { level: 1, name: /যেখানে শুরু হয় পবিত্র বন্ধন/i })).toBeTruthy()
})

test('builds a complete public biodata without private fields', () => {
  const profile = buildPublicProfile({
    gender: 'পাত্রী', age: '২৫', birthYear: '২০০১', height: '৫′ ৩″', weight: '৫০ কেজি',
    bloodGroup: 'A+', complexion: 'উজ্জ্বল শ্যামলা', marital: 'অবিবাহিত', nationality: 'বাংলাদেশী',
    dist: 'ঢাকা', upazila: 'সাভার', thana: 'সাভার', union: 'বিরুলিয়া', village: 'আক্রান',
    currentAddress: 'ঢাকা', grewUp: 'ঢাকা', educationMedium: 'সাধারণ', edu: 'স্নাতক',
    institute: 'একটি বিশ্ববিদ্যালয়', religiousStudy: 'কুরআন শিক্ষা', job: 'শিক্ষক',
    deen: 'দ্বীন পালনে সচেষ্ট', prayer: 'পাঁচ ওয়াক্ত', quran: 'নিয়মিত', fiqh: 'হানাফি',
    mahram: 'মেনে চলি', hobbies: 'বই পড়া', fatherStatus: 'জীবিত', fatherJob: 'ব্যবসা',
    motherStatus: 'জীবিত', motherJob: 'গৃহিণী', siblings: 'দুইজন', economicStatus: 'মধ্যবিত্ত',
    family: 'ছোট পরিবার', familyDeen: 'দ্বীনি পরিবেশ', marriageReason: 'দ্বীন পূর্ণ করা',
    spouseStudy: 'সম্মতি আছে', spouseJob: 'আলোচনা সাপেক্ষ', residenceAfterMarriage: 'ঢাকা',
    expectedAge: '২৭–৩২', expectedHeight: '৫′ ৬″+', expectedEducation: 'স্নাতক',
    expectedDistrict: 'যেকোনো', expectedMarital: 'অবিবাহিত', expectedQualities: 'সৎ ও দ্বীনদার',
    guardian: 'অভিভাবক', about: 'পরিবারমুখী', monthlyIncome: 'গোপন আয়',
    health: 'গোপন স্বাস্থ্য', guardianPhone: '01700000000', phone: '01800000000', name: 'গোপন নাম',
  }, 'NN-1234')

  const serialized = JSON.stringify(profile)
  expect(profile.sections).toHaveLength(8)
  expect(serialized).toContain('জন্মসাল')
  expect(serialized).toContain('বিয়ে সম্পর্কিত পরিকল্পনা')
  expect(serialized).not.toContain('গোপন আয়')
  expect(serialized).not.toContain('গোপন স্বাস্থ্য')
  expect(serialized).not.toContain('01700000000')
  expect(serialized).not.toContain('01800000000')
  expect(serialized).not.toContain('গোপন নাম')
})
