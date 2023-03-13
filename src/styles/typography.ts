import * as colors from './palette';
import { spacing } from './spacings';

export const fontSizes = {
	headingLarge: {
		fontSize: 57,
	},
	headingMedium: {
		fontSize: 45,
	},
	bodyLarge: {
		fontSize: 16,
	},
	bodyMedium: {
		fontSize: 14,
	},
	bodySmall: {
		fontSize: 12,
	},
	titleLarge: {
		fontSize: 24,
	},
};

export const fontWeights = {
	defaultWeight: {
		fontWeight: 400,
	},
};

export const lineHeights = {
	headingLarge: {
		lineHeight: 64,
	},
	headingMedium: {
		lineHeight: 52,
	},
	bodyLarge: {
		lineHeight: 24,
	},
	bodyMedium: {
		lineHeight: 20,
	},
	bodySmall: {
		lineHeight: 16,
	},
};

export const pageHeader = {
	big: {
		color: colors.blue.regular,
		marginTop: spacing.m,
		marginBottom: spacing.m,
		...fontSizes.headingLarge,
		...lineHeights.headingLarge,
	},
	medium: {
		color: colors.blue.light,
		marginTop: spacing.m,
		marginBottom: spacing.m,
		...fontSizes.headingMedium,
		...lineHeights.headingMedium,
	},
	small: {
		color: colors.blue.light,
		marginTop: spacing.m,
		marginBottom: spacing.m,
		...fontSizes.headingMedium,
		...lineHeights.headingMedium,
	},
};

export const regularText = {
	bigWhite: {
		color: colors.neutral.white,
		marginTop: spacing.s,
		marginBottom: spacing.s,
		...fontSizes.bodyLarge,
		...fontWeights.defaultWeight,
		...lineHeights.bodyLarge,
	},
	bigBlack: {
		color: colors.neutral.black,
		marginTop: spacing.s,
		marginBottom: spacing.s,
		...fontSizes.bodyLarge,
		...fontWeights.defaultWeight,
		...lineHeights.bodyLarge,
	},
	medWhite: {
		color: colors.neutral.white,
		marginTop: spacing.s,
		marginBottom: spacing.s,
		...fontSizes.bodyMedium,
		...fontWeights.defaultWeight,
		...lineHeights.bodyMedium,
	},
	medBlack: {
		color: colors.neutral.black,
		marginTop: spacing.s,
		marginBottom: spacing.s,
		...fontSizes.bodyMedium,
		...fontWeights.defaultWeight,
		...lineHeights.bodyMedium,
	},
	smallWhite: {
		color: colors.neutral.white,
		marginTop: spacing.s,
		marginBottom: spacing.s,
		...fontSizes.bodySmall,
		...fontWeights.defaultWeight,
		...lineHeights.bodySmall,
	},
	smallBlack: {
		color: colors.neutral.black,
		marginTop: spacing.s,
		marginBottom: spacing.s,
		...fontSizes.bodySmall,
		...fontWeights.defaultWeight,
		...lineHeights.bodySmall,
	},
};
