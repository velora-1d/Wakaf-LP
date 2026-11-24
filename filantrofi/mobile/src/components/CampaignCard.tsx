import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { CampaignItem } from '../types/campaign';

interface CampaignCardProps {
  campaign: CampaignItem;
  onPress: (campaign: CampaignItem) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onPress }) => {
  const percentage = Math.min(
    Math.round((campaign.collectedAmount / campaign.targetAmount) * 100),
    100
  );

  const formatCurrency = (amount: number) => {
    return 'Rp ' + amount.toLocaleString('id-ID');
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress(campaign)}
    >
      <Image source={{ uri: campaign.bannerUrl }} style={styles.banner} />
      <View style={styles.content}>
        <View style={styles.badgeRow}>
          <Text style={styles.categoryBadge}>{campaign.category.toUpperCase()}</Text>
          {campaign.isVerified && (
            <Text style={styles.verifiedBadge}>TERVERIFIKASI</Text>
          )}
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {campaign.title}
        </Text>

        <Text style={styles.institutionName} numberOfLines={1}>
          {campaign.institutionName}
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
          </View>
        </View>

        <View style={styles.metaRow}>
          <View>
            <Text style={styles.metaLabel}>Terkumpul</Text>
            <Text style={styles.metaValueHighlight}>
              {formatCurrency(campaign.collectedAmount)}
            </Text>
          </View>
          <View style={styles.metaRight}>
            <Text style={styles.metaLabel}>Sisa Hari</Text>
            <Text style={styles.metaValue}>{campaign.daysRemaining} hari</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 16,
  },
  banner: {
    width: '100%',
    height: 160,
    backgroundColor: '#e2e8f0',
  },
  content: {
    padding: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  verifiedBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    backgroundColor: colors.chipInactive,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: 4,
  },
  institutionName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRight: {
    alignItems: 'flex-end',
  },
  metaLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  metaValueHighlight: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
