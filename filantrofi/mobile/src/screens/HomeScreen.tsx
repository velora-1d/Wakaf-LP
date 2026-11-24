import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { colors } from '../theme/colors';
import { CampaignCard } from '../components/CampaignCard';
import { CampaignCategory, CampaignItem } from '../types/campaign';

const MOCK_CAMPAIGNS: CampaignItem[] = [
  {
    id: 'c1',
    slug: 'wakaf-pembangunan-masjid-khairu-ummah',
    title: 'Wakaf Pembangunan Masjid & Pusat Pendidikan Khairu Ummah Sugro',
    category: 'wakaf',
    institutionName: 'Global Village Fund (GVF)',
    bannerUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    targetAmount: 2500000000,
    collectedAmount: 1420000000,
    donorCount: 840,
    daysRemaining: 45,
    isVerified: true,
  },
  {
    id: 'c2',
    slug: 'infaq-fasilitas-santri-dhuafa',
    title: 'Infaq Sarana Asrama & Sanitasi Sehat untuk Santri Dhuafa Penghafal Quran',
    category: 'infaq',
    institutionName: 'Global Village Fund (GVF)',
    bannerUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80',
    targetAmount: 500000000,
    collectedAmount: 312500000,
    donorCount: 420,
    daysRemaining: 18,
    isVerified: true,
  },
  {
    id: 'c3',
    slug: 'sedekah-pangan-beras-santri',
    title: 'Sedekah Paket Beras & Nutrisi Mingguan Santri Dhuafa Jonggol',
    category: 'sedekah',
    institutionName: 'Global Village Fund (GVF)',
    bannerUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&auto=format&fit=crop&q=80',
    targetAmount: 120000000,
    collectedAmount: 98000000,
    donorCount: 650,
    daysRemaining: 12,
    isVerified: true,
  },
];

const CATEGORIES: { key: CampaignCategory; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'wakaf', label: 'Wakaf' },
  { key: 'infaq', label: 'Infaq' },
  { key: 'sedekah', label: 'Sedekah' },
  { key: 'zakat', label: 'Zakat' },
];

export const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory>('all');

  const filteredCampaigns =
    selectedCategory === 'all'
      ? MOCK_CAMPAIGNS
      : MOCK_CAMPAIGNS.filter((item) => item.category === selectedCategory);

  const handleSelectCampaign = (campaign: CampaignItem) => {
    // Navigate to campaign detail
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>Filantrofi Mobile</Text>
          <Text style={styles.brandSubtitle}>Ekosistem Kebaikan & Wakaf Terpercaya</Text>
        </View>
      </View>

      {/* Category Chips */}
      <View style={styles.chipWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipContainer}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.chip,
                  isActive ? styles.chipActive : styles.chipInactive,
                ]}
                onPress={() => setSelectedCategory(cat.key)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.chipText,
                    isActive ? styles.chipTextActive : styles.chipTextInactive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Campaign List */}
      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Program Pilihan</Text>
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onPress={handleSelectCampaign}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chipWrapper: {
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 10,
  },
  chipContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipInactive: {
    backgroundColor: colors.chipInactive,
    borderColor: colors.border,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  chipTextInactive: {
    color: colors.textSecondary,
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
});
