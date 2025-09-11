export interface Dua {
    id: number;
    title: string;
    iconName: string;
    iconSet: string;
    route: string;
    color: string;
    size: number;
}

export const DuaCategories: Dua[] = [
    {
        id: 1,
        title: 'Morning & Evening',
        iconName: 'brightness-6',
        iconSet: 'MaterialCommunityIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
    {
        id: 2,
        title: 'Praising Allah',
        iconName: 'moon-waxing-crescent',
        iconSet: 'MaterialCommunityIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
    {
        id: 5,
        title: 'Sick & Death',
        iconName: 'emoticon-sick-outline',
        iconSet: 'MaterialCommunityIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
    {
        id: 6,
        title: 'Haj & Umrah',
        iconName: 'mosque',
        iconSet: 'MaterialCommunityIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
    {
        id: 11,
        title: 'Prayer',
        iconName: 'mosque',
        iconSet: 'MaterialCommunityIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
    {
        id: 7,
        title: 'Travel',
        iconName: 'airplane',
        iconSet: 'MaterialCommunityIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
    {
        id: 3,
        title: 'Food & Drinks',
        iconName: 'hamburger',
        iconSet: 'MaterialCommunityIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
    {
        id: 4,
        title: 'Joy & Sorrow',
        iconName: 'emoji-emotions',
        iconSet: 'MaterialIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
    {
        id: 8,
        title: 'Nature',
        iconName: 'pine-tree',
        iconSet: 'MaterialCommunityIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
    {
        id: 9,
        title: 'Home & Family',
        iconName: 'family-restroom',
        iconSet: 'MaterialIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
    {
        id: 10,
        title: 'Good & Etiquette',
        iconName: 'hand-heart-outline',
        iconSet: 'MaterialCommunityIcons',
        route: 'DuaSubCategory',
        color: '#3DC8B2',
        size: 24,
    },
];