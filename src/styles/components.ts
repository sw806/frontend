import * as colors from './palette';
import * as typography from './typography';
import { spacing } from './spacings';

export const buttons = {
	primary: {
		contained: {
			backgroundColor: colors.blue.regular,
			height: 40,
			width: 150,
			margin: spacing.s,
			textColor: colors.neutral.white,
		},
		fullWidth: {
			backgroundColor: colors.blue.regular,
			height: 40,
			width: '100%',
			margin: spacing.s,
			textColor: colors.neutral.white,
		},
	},
	secondary: {
		contained: {
			backgroundColor: colors.neutral.grey,
			height: 40,
			width: 150,
			margin: spacing.s,
			textColor: colors.neutral.white,
		},
		fullWidth: {
			backgroundColor: colors.neutral.grey,
			height: 40,
			width: '100%',
			margin: spacing.s,
			textColor: colors.neutral.white,
		},
	},
	danger: {
		contained: {
			backgroundColor: colors.red.regular,
			height: 40,
			width: 150,
			margin: spacing.s,
			textColor: colors.neutral.white,
		},
		fullWidth: {
			backgroundColor: colors.red.regular,
			height: 40,
			width: '100%',
			margin: spacing.s,
			textColor: colors.neutral.white,
		},
	},
	success: {
		contained: {
			backgroundColor: colors.green.regular,
			height: 40,
			width: 150,
			margin: spacing.s,
			textColor: colors.neutral.white,
		},
		fullWidth: {
			backgroundColor: colors.green.regular,
			height: 40,
			width: '100%',
			margin: spacing.s,
			textColor: colors.neutral.white,
		},
	},
	unstyled: {
		contained: {
			height: 40,
			width: 150,
			margin: spacing.s,
		},
		fullWidth: {
			height: 40,
			width: '100%',
			margin: spacing.s,
		},
	},
};

export const inputFields = {
	styling: {
		marginTop: spacing.xs,
	},
	modes: {
		contained: 'contained',
		outlined: 'outlined',
		flat: 'flat',
	},
	keyboards: {
		normal: 'default',
		numbers: 'numeric',
	},
};

export const containers = {
	results: {
		display: 'flex',
		alignItems: 'center',
	},
	card: {
		backgroundColor: '#009FFF',
		margin: spacing.s,
	},
	scheduleIcon: {
		backgroundColor: 'rgba(255, 255, 255, 0)',
	},
	button: {
		single: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
		},
		multiple: {
			flexDirection: 'row',
			alignSelf: 'center',
		},
	},
	modals: {
		background: {
			flex: 1,
			backgroundColor: 'rba(0,0,0,0,5)',
			justifyContent: 'center',
			alignItems: 'center',
		},
		contained: {
			width: '80%',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'white',
			paddingHorizontal: 20,
			paddingVertical: 30,
			elevation: 20,
			borderRadius: 20,
		},
	},
	screen: {
		flex: 1,
		width: '80%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 30,
	},
	flexContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
};
