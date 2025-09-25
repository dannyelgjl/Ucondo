export const theme = {
  colors: {
    textDefault: '#343A40',
    transparent: 'transparent',

    // Identity Color
    brandPrimaryDarkest: '#5F2A0B',
    brandPrimaryMedium: '#FF6900',
    brandPrimaryDark: '#622490',
    brandPrimaryLight: '#F8C9AD',
    brandPrimaryLightest: '#FFE0CD',

    brandSecondaryDarkest: '#534C42',
    brandSecondaryDark: '#757575',
    brandSecondaryMedium: '#F0EDF5',
    brandSecondaryLight: '#EEEEEE',

    brandTertiaryDarkest: '#1F1610',
    brandTertiaryDark: '#37261D',
    brandTertiaryMedium: '#512313',
    brandTertiaryLight: '#977B71',
    brandTertiaryLightest: '#CBBDB8',

    // Grey Scale
    supportSecondaryDarkest: '#3D3D4C',
    supportSecondaryDark: '#252525',
    supportSecondaryMedium: '#606060',
    supportSecondaryLight: '#8E8E89',
    supportSecondaryLightest: '#6B6B6B',

    supportPrimaryDarkest: '#B5B5B5',
    supportPrimaryDark: '#B8B8B8',
    supportPrimaryMedium: '#E0E0E0',
    supportPrimaryLight: '#6A6A6A',
    supportPrimaryWhite: '#FFFFFF',
    supportPrimaryWhite20: '#FFFFFF33',

    // Alerts Colors
    feedbackSuccessDarkest: '#1C9344',
    feedbackSuccessDark: '#1BA803',
    feedbackSuccessMedium: '#8DC44F',
    feedbackSuccessLight: '#B9F4CA',
    feedbackSuccessLightest: '#D4FDDF',

    feedbackAlertDarkest: '#FCD33B',
    feedbackAlertDark: '#005C97',
    feedbackAlertMedium: '#30ABEE',
    feedbackAlertLight: '#FFEDAB',
    feedbackAlertLightest: '#E5F4FD',

    feedbackErrorDarkest: '#900000',
    feedbackErrorDark: '#FF0000',
    feedbackErrorMedium: '#CC2130',
    feedbackErrorLight: '#FEC9C9',
    feedbackErrorLightest: '#FDE0E0',

    // Category Colors
    brandCategoryClassicDarkest: '#4B2614',
    brandCategoryClassicDark: '#813711',
    brandCategoryClassicMedium: '#AA6E4F',
    brandCategoryClassicLight: '#D28D66',
    brandCategoryClassicLightest: '#D9C3B8',

    brandCategoryGoldDarkest: '#442407',
    brandCategoryGoldDark: '#9C6A23',
    brandCategoryGoldMedium: '#E1BD61',
    brandCategoryGoldLight: '#ECD7A0',
    brandCategoryGoldLightest: '#F6EBD0',

    brandCategoryPlatinumDarkest: '#484545',
    brandCategoryPlatinumDark: '#717171',
    brandCategoryPlatinumMedium: '#B4ADAC',
    brandCategoryPlatinumLight: '#D1CECD',
    brandCategoryPlatinumLightest: '#E8E6E6',

    brandCategoryBlackDarkest: '#000000',
    brandCategoryBlackDark: '#0D0D0D',
    brandCategoryBlackMedium: '#2B2B2B',
    brandCategoryBlackLight: '#B2B2B2',
    brandCategoryBlackLightest: '#D1D1D1',

    // Gradients
    brandCategoryGradientClassicHorizontal: '',
    brandCategoryGradientClassicVertical: '',
    brandCategoryGradientClassicDiagonal: '',
    brandCategoryGradientGoldHorizontal: '',
    brandCategoryGradientGoldVertical: '',
    brandCategoryGradientGoldDiagonal: '',
    brandCategoryGradientPlatinumHorizontal: '',
    brandCategoryGradientPlatinumVertical: '',
    brandCategoryGradientPlatinumDiagonal: '',
    brandCategoryGradientBlackHorizontal: '',
    brandCategoryGradientBlackVertical: '',
    brandCategoryGradientBlackDiagonal: '',

    classic: ['#813711', '#AA6E4F'],
    gold: ['#9C6A02', '#E1BD61'],
    platinum: ['#484545', '#B4ADAC'],
    black: ['#000000', '#666666'],

    exclusiveClassic: ['#4B2614', '#4B261400'],
    exclusiveGold: ['#442407', '#44240700'],
    exclusivePlatinum: ['#484545', '#48454500'],
    exclusiveBlack: ['#000000', '#00000000'],
  },
  fonts: {
    Frutiger_Roman: 'Frutiger-Roman',
    Roboto_100Thin_Italic: 'Roboto-ThinItalic',
    Roboto_300Light: 'Roboto-Light',
    Roboto_300Light_Italic: 'Roboto-LightItalic',
    Roboto_400Regular: 'Roboto-Regular',
    Roboto_400Italic: 'Roboto-Italic',
    Roboto_500Medium: 'Roboto-Medium',
    Roboto_500Medium_Italic: 'Roboto-MediumItalic',
    Roboto_700Bold: 'Roboto-Bold',
    Roboto_700Bold_Italic: 'Roboto-BoldItalic',
    Roboto_900Black: 'Roboto-Black',
    Roboto_900Black_Italic: 'Roboto-BlackItalic',
  },
};

type TColorsType = keyof typeof theme.colors;
export type TTheme = typeof theme;

export type { TColorsType };
