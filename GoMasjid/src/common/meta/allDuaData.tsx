export interface Dua {
  data: any;
  categoryId: number;
  categoryName: string;
}

export interface DuaData {
  data: any;
  englishTranslation: string;
  transliteration: string;
  arabicVerse: string;
}

export const allDuaData: Dua[] = [
  {
    categoryId: 1,
    categoryName: 'Morning & Evening',
    data: [
      {
        title: 'When waking up',
        data: [
          {
            duaId: 1,
            englishTranslation:
              'O Allah, bring it over us with blessing and faith, and security and Islam. My Lord and your Lord is Allah.',
            transliteration: `'Alhamdu lillaahil-lathee 'ahyaanaa ba'da maa 'amaatanaa wa'ilayhin-nushoor.'`,
            arabicVerse:
              'اَلْحَمْدُ لِلَّهِ الَّذي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
            reference:
              '[Hisnul 1] [Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 11/113, Muslim 4/2083.]',
            url: 'https://admin.gomasjid.co.uk/assets/dua/1hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'There is none worth of worship but Allah alone, Who has no partner, His is the dominion and to Him belongs all praise, 
                  and He is able to do all things. Glory is to Allah. Praise is to Allah. There is none worth of worship but Allah. Allah is the Most Great. 
                  There is no might and no power except by Allah's leave, the Exalted, the Mighty. My Lord, forgive me. (Whoever says this will be forgiven, and if
                    he supplicates Allah, his prayer will be answered; if he performs ablution and prays, his prayer will be accepted.)'`,
            transliteration: `'Laa 'illaha 'illallahu wahdahu la shareeka lahu, lahul-mulku wa lahul-hamdu, wa Huwa 'alaa kulli shay'in 
                  Qadeer Subhaanallahi, walhamdu lillaahi, wa laa 'ilaha 'illallahu, wallaahu 'akbar, wa laa hawla wa laa 
                  Quwwata 'illaa billaahil-'Aliyyil-'Adheem, Rabbighfir lee'`,
            arabicVerse:
              'لَا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحاَنَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلاَ إِلَهَ إِلاَّ اللَّهُ وَاللَّهُ أَكْبَرُ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِ',
            reference:
              '[Hisnul 2] [Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 3/39, Ibn Majah 2/335.]',
            url: 'https://admin.gomasjid.co.uk/assets/dua/2hm.mp3',
          },

          {
            duaId: 3,
            englishTranslation: `'Praise is to Allah Who gave strength to my body and returned my soul to me and permitted me to remember Him.'`,
            transliteration: `'Alhamdu lillaahil-lathee 'aafaanee fee jasadee, wa radda 'alayya roohee, wa 'athina lee bithikrihi.'`,
            arabicVerse:
              'الْحَمْدُ للّهِ الَّذِي عَافَانِي فِي جَسَدِيْ، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ',
            reference: `'[Hisnul 3] [At-Tirmizi 5/473, Al-Albani's Sahih Tirmithi 3/144.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/3hm.mp3',
          },

          {
            duaId: 4,
            englishTranslation: `Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.190 Who remember Allah while standing or sitting or (lying) on their sides and give thought to the creation of the heavens and the earth, (saying), "Our Lord, You did not create this aimlessly; exalted are You (above such a thing); then protect us from the punishment of the Fire.191 Our Lord, indeed whoever You admit to the Fire - You have disgraced him, and for the wrongdoers there are no helpers.192 Our Lord, indeed we have heard a caller calling to faith, (saying), 'Believe in your Lord,' and we have believed. Our Lord, so forgive us our sins and remove from us our misdeeds and cause us to die with the righteous.193 Our Lord, and grant us what You promised us through Your messengers and do not disgrace us on the Day of Resurrection. Indeed, You do not fail in (Your) promise.194 And their Lord responded to them, "Never will I allow to be lost the work of (any) worker among you, whether male or female; you are of one another. So those who emigrated or were evicted from their homes or were harmed in My cause or fought or were killed - I will surely remove from them their misdeeds, and I will surely admit them to gardens beneath which rivers flow as reward from Allah , and Allah has with Him the best reward."195 Be not deceived by the (uninhibited) movement of the disbelievers throughout the land.196 (It is but) a small enjoyment; then their (final) refuge is Hell, and wretched is the resting place.197 But those who feared their Lord will have gardens beneath which rivers flow, abiding eternally therein, as accommodation from Allah . And that which is with Allah is best for the righteous.198 And indeed, among the People of the Scripture are those who believe in Allah and what was revealed to you and what was revealed to them, (being) humbly submissive to Allah . They do not exchange the verses of Allah for a small price. Those will have their reward with their Lord. Indeed, Allah is swift in account.199 O you who have believed, persevere and endure and remain stationed and fear Allah that you may be successful.200`,
            transliteration: `'Inna fee khalqis-samaawaati wal'ardhi wakhtilaafil-layli wannahaari la'aayaatil-li 'oolil-'albaab. Allatheena yathkuroon-allaaha qiyaaman wa qu'oodan vua
                    'alaa junoobihim wa yatafakkaroona fee khalqis-samaawaati wal'ardhi Rabbanaa maa khalaqta haathaa baatilan subhaanaka faqinaa 'athaaban-naar. Rabbanaa 'innaka 
                    man tudkhilin-naara faqad 'akhzaytahu wa maa lidhdhalimeena rain 'ansaar. Rabbanaa 'innanaa sami'naa munaadiyan yunaadee lil'eemaani 'an 'aaminoo birabbikum 
                    fa'aamannaa, Rabbanaa faghfir lanaa thunoobanaa wa kaffir 'annaa sayyi'aatinaa wa tawaffanaa ma'al-'abraar. Rabbanaa wa 'aatinaa maa wa'adtanaa 'alaa rusulika 
                    wa laa tukhzinaa yawmal-qiyaamati, 'innaka laa tukhliful-mee'aad. Fastajaaba lahum Rabbuhum'annee laa 'udhee'u 'amala 'aanulim-minkum min thakarin 'aw 'unthaa,
                    ba'dhukum mim ba'dh, fallatheena haajaroo wa 'ukhrijoo min diyaarihim wa 'oothoo fee sabeelee wa qaataloo wa qutiloo la'ukaffiranna 'anhum sayyi'aatihim wa 
                    la'udkhilannahum jannaatin tajree min tahtihal-'anhaaru thawaaban min 'indillaah, wallaahu 'indahu husnuth-thawaab. Laa yaghur-rannaka taqallubul-latheena 
                    kafaroo fil-bilaad. Mataa'un qaleelun thumma ma'waahum jahannam, wa bi'sal-mihaad. Laakinil-latheenat-taqaw Rabbahum lahumjannaatun tajree min tahtihal-'anhaaru 
                    khaalideena feehaa nuzulam-min 'indillaah, wa maa 'indallaahi khayrul-lil'abraar. Wa 'inna min 'ahlil-kitaabi laman yu'minu billaahi wa maa 'unzila 'ilaykum wa 
                    maa 'unzila 'ilayhim khaashi'eena lillaahi laa yashtaroona bi'aayaatillaahi thamanan qaleela, 'oolaa'ika lahum 'ajruhum 'inda Rabbihim, 'innallaaha saree'ul-hisaab. 
                    Yaa'ayyuhal-latheena 'aamanus-biroo wa saabiroo wa raabitoo wattaqul-laaha la'allakum tuflihoon.`,
            arabicVerse:
              'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الأَلْبَابِ، الَّذِينَ يَذْكُرُونَ اللهَ قِيَامًا وَقُعُودًا وَعَلَى جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ، رَبَّنَا إِنَّكَ مَنْ تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ وَمَا لِلظَّالِمِينَ مِنْ أَنْصَارٍ، رَبَّنَا إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِي لِلْإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ فَآمَنَّا رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ، رَبَّنَا وَآتِنَا مَا وَعَدْتَنَا عَلَى رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ الْقِيَامَةِ إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ، فَاسْتَجَابَ لَهُمْ رَبُّهُمْ أَنِّي لَا أُضِيعُ عَمَلَ عَامِلٍ مِنْكُمْ مِنْ ذَكَرٍ أَوْ أُنْثَى بَعْضُكُمْ مِنْ بَعْضٍ فَالَّذِينَ هَاجَرُوا وَأُخْرِجُوا مِنْ دِيَارِهِمْ وَأُوذُوا فِي سَبِيلِي وَقَاتَلُوا وَقُتِلُوا لَأُكَفِّرَنَّ عَنْهُمْ سَيِّئَاتِهِمْ وَلَأُدْخِلَنَّهُمْ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ ثَوَابًا مِنْ عِنْدِ اللَّهِ وَاللَّهُ عِنْدَهُ حُسْنُ الثَّوَابِ، لَا يَغُرَّنَّكَ تَقَلُّبُ الَّذِينَ كَفَرُوا فِي الْبِلَادِ، مَتَاعٌ قَلِيلٌ ثُمَّ مَأْوَاهُمْ جَهَنَّمُ وَبِئْسَ الْمِهَادُ، لَكِنِ الَّذِينَ اتَّقَوْا رَبَّهُمْ لَهُمْ جَنَّاتٌ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا نُزُلًا مِنْ عِنْدِ اللَّهِ وَمَا عِنْدَ اللَّهِ خَيْرٌ لِلْأَبْرَارِ، وَإِنَّ مِنْ أَهْلِ الْكِتَابِ لَمَنْ يُؤْمِنُ بِاللَّهِ وَمَا أُنْزِلَ إِلَيْكُمْ وَمَا أُنْزِلَ إِلَيْهِمْ خَاشِعِينَ للَّهِ لَا يَشْتَرُونَ بِآيَاتِ اللَّهِ ثَمَنًا قَلِيلًا أُولَئِكَ لَهُمْ أَجْرُهُمْ عِنْدَ رَبِّهِمْ إِنَّ اللهَ سَرِيعُ الْحِسَابِ، يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللهَ لَعَلَّكُمْ تُفْلِحُون',
            reference: `'[Hisnul 4] [Qur'an Al-'Imran 3: 190-200, Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 8/237, Muslim 1/530.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/4hm.mp3',
          },
        ],
      },
      {
        title: 'Remembrance In the morning and evening',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I seek refuge in Allah from Satan the outcast. - Allah! There is none worthy of worship but He, the Ever Living, the One Who sustains and protects all that exists. Neither slumber nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who is he that can intercede with Him except with His Permission? He knows what happens to them in this world, and what will happen to them in the Hereafter. And they will never encompass anything of His Knowledge except that which He wills. His Throne extends over the heavens and the earth, and He feels no fatigue in guarding and preserving them. And He is the Most High, the Most Great.(Whoever says this when he rises in the morning will be protected from jinns until he retires in the evening, and whoever says it when retiring in the evening will be protected from them until he rises in the morning.)'`,
            transliteration: `''A 'oothu billaahi minash-Shaytaanir-rajeem. Allaahu laa 'ilaaha 'illaa Huwal-Hayyul-Qayyoom, laa ta'khuthuhu sinatun wa laa nawm, lahu maa fis-samaawaati wa maa fil-'ardh, man thai-lathee yashfa'u 'indahu 'illaa bi'ithnih, ya'lamu maa bayna 'aydeehim wa maa khalfahum, wa laa yuheetoona bishay'im-min 'ilmihi 'illaa bimaa shaa'a, wasi'a kursiyyuhus samaawaati wal'ardh, wa laa ya'ooduhu hifdhuhumaa, wa Huwal- 'Aliyyul- 'Adheem.'`,
            arabicVerse: `'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ'`,
            reference: `'[Hisnul 75] [Al-Hakim 1 / 562, Sahih at-Targhib wa at-Tarhib 1/273, at-Tabarani.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/75hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'Recite Al-Ikhlas, Al-Falaq and An-Nas.(Whoever recites these Three times in the morning and in the evening, they will suffice him (as a protection) against everything.)'`,
            transliteration: `'Qul huwa Allahu ahad, Allahu assamad, Lam yalid walam yoolad, Walam yakun lahu kufuwan ahad. Qul a'aoothu birabbi alfalaq, Min sharri ma khalaq, Wamin sharri ghasiqin ithawaqab, Wamin sharri annaffathatifee al'uqad, Wamin sharri hasidin itha hasad. Qul a'aoothu birabbi annas, Maliki annas, Ilahi annas, Min sharri alwaswasi alkhannas, Allathee yuwaswisu fee sudoori annas, Mina aljinnati wannas.'`,
            arabicVerse: `'قُلْ هُوَ اللَّـهُ أَحَدٌ، اللَّـهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ. قُلْ أَعُوذُ بِرَ‌بِّ الْفَلَقِ، مِن شَرِّ‌ مَا خَلَقَ، وَمِن شَرِّ‌ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ‌ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ‌ حَاسِدٍ إِذَا حَسَدَ. قُلْ أَعُوذُ بِرَ‌بِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَـٰهِ النَّاسِ، مِن شَرِّ‌ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ‌ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ.'`,
            reference: `'[Hisnul 76] [Al-Ikhlas:1-4. Al-Falaq:1-5. An-Nas:1-6, Abu Dawud 4/322, At-Tirmizi 5/567, Sahih At-Tirmizi 3/182.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/76hm.mp3',
          },

          {
            duaId: 3,
            englishTranslation: `'We have entered the morning (evening) and with it all dominion is Allah's. Praise is to Allah. None has the right to be worshiped but Allah alone, Who has no partner. To Allah belongs the dominion, and to Him is the praise and He is Able to do all things. My Lord, I ask You for the goodness of this day and of the days that come after it, and I seek refuge in You from the evil of this day and of the days that come after it. My Lord, I seek refuge in You from laziness and helpless old age. My Lord, I seek refuge in You from the punishment of Hell-fire, and from the punishment of the grave. (Recite in the bracket in the evening.)'`,
            // transliteration: `'Qul huwa Allahu ahad, Allahu assamad, Lam yalid walam yoolad, Walam yakun lahu kufuwan ahad. Qul a'aoothu birabbi alfalaq, Min sharri ma khalaq, Wamin sharri ghasiqin ithawaqab, Wamin sharri annaffathatifee al'uqad, Wamin sharri hasidin itha hasad. Qul a'aoothu birabbi annas, Maliki annas, Ilahi annas, Min sharri alwaswasi alkhannas, Allathee yuwaswisu fee sudoori annas, Mina aljinnati wannas.'`,
            arabicVerse: `'أَصْبَحْنَا وَأَصْبَحَ (اَمْسَيْنَا وَاَمْسَ) الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هَذَا الْيَوْمِ (اللَّيْلَةِ) وَخَيْرَ مَا بَعْدَهُ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ (اللَّيْلَةِ) وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ، وَسُوءِ الْكِبَرِ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِيْ النَّارِ وَعَذَابٍ فِيْ الْقَبْرِ'`,
            reference: `'[Hisnul 77] [Muslim 4/2088.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/77hm.mp3',
          },

          {
            duaId: 4,
            englishTranslation: `'O Allah, by You we enter the morning (evening) and by You we enter the evening (morning), by You we live and and by You we die, and to You is our resurrection. (Recite in the bracket in the evening.)'`,
            transliteration: `'Allaahumma bika 'asbahnaa ('amsaynaa), wa bika 'amsaynaa, wa bika nahyaa, wa bika namootu wa 'ilaykan-nushoor.'`,
            arabicVerse: `'اللَّهُمَّ بِكَ أَصْبَحْنَا (أَمْسَـينا)، وَبِكَ أَمْسَيْنَا (أَصْبَحْنَا)، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ'`,
            reference: `'[Hisnul 78] [Sahih At-Tirmizi 3/142.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/78hm.mp3',
          },

          {
            duaId: 5,
            englishTranslation: `'O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am your slave. I keep Your covenant, and my pledge to You so far as I am able. I seek refuge in You from the evil of what I have done. I admit to Your blessings upon me, and I admit to my misdeeds. Forgive me, for there is none who may forgive sins but You.(Whoever recites this with conviction in the evening and dies during that night shall enter Paradise, and whoever recites it with conviction in the morning and dies during that day shall enter Paradise.)'`,
            transliteration: `'Allaahumma 'Anta Rabbee laa 'ilaaha 'illaa 'Anta, khalaqtanee wa 'anaa 'abduka, wa 'anaa 'alaa 'ahdika wa wa'dika mas-tata'tu, 'a'oothu bika min sharri maa sana'tu, 'aboo'u laka bini'matika 'alayya, wa 'aboo'u bithanbee faghfir lee fa'innahu laa yaghfiruth-thunooba 'illaa 'Anta.'`,
            arabicVerse: `'اللَّهُمَّ أَنْتَ رَبِّي لَّا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِر لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ'`,
            reference: `'[Hisnul 79] [Al-Bukhari 7/150, An-Nasa'i, At-Tirmizi.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/79hm.mp3',
          },

          {
            duaId: 6,
            englishTranslation: `'O Allah, I have entered the morning (evening) and I witness You and witness the bearers of Your Throne, and Your angels and all of Your creation to witness that You are Allah, there is none worthy of worship but You alone, You have no partners, and that Muhammad is Your slave and Your Messenger. (Recite in the bracket in the evening.) (Allah will spare whoever says this four times in the morning or evening from the fire of Hell.)'`,
            transliteration: `'Allaahumma 'innee 'asbahtu ('amsaytu) 'ush-hiduka wa 'ush-hidu hamalata 'arshika, wa malaa'ikataka wajamee'a khalqika, 'annaka 'Antallaahu laa 'ilaaha 'illaa 'Anta wahdaka laa shareeka laka, wa 'anna Muhammadan 'abduka wa Rasooluka.'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي أَصْبَحْتُ (اَمْسَيْتُ) أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ'`,
            reference: `'[Hisnul 80] [Abu Dawud 4/317, An-Nasa'i, Ibn As-Sunni.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/80hm.mp3',
          },

          {
            duaId: 7,
            englishTranslation: `'O Allah, I have entered the morning (evening) and I witness You and witness the bearers of Your Throne, and Your angels and all of Your creation to witness that You are Allah, there is none worthy of worship but You alone, You have no partners, and that Muhammad is Your slave and Your Messenger. (Recite in the bracket in the evening.) (Allah will spare whoever says this four times in the morning or evening from the fire of Hell.)O Allah, whatever blessing has been received by me in the morning (evening) or anyone of Your creation is from You alone, You have no partner. All praise is for you and thanks is to You. (Recite in the bracket in the evening.) (Whoever recites this in the morning, has completed his obligation to thank Allah for that day; and whoever says it in the evening, has completed his obligation for that night.)'`,
            transliteration: `'Allaahumma maa 'asbaha ('amsaa) bee min ni'matin 'aw bi'ahadin min khalqika faminka wahdaka laa shareeka laka, falakal-hamdu wa lakash-shukru.'`,
            arabicVerse: `'اللَّهُمَّ مَا أَصْبَحَ(أََمْسَ) بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ'`,
            reference: `'[Hisnul 81] [Abu Dawud 4/318, Ibn As-Sunni (Hadith no. 41), Ibn Hibban (Hadith no. 2361).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/81hm.mp3',
          },

          {
            duaId: 8,
            englishTranslation: `'O Allah, make me healthy in my body. O Allah, preserve for me my hearing. O Allah, preserve for me my sight. There is none worthy of worship but You. O Allah, I seek refuge in You from disbelief and poverty and I seek refuge in You from the punishment of the grave. There is none worthy of worship but You. (Three times)'`,
            transliteration: `'Allaahumma 'aafinee fee badanee, Allaahumma 'aafinee fee sam'ee, Allaahumma 'aafinee fee basaree, laa 'ilaaha 'illaa 'Anta (three times).Allaahumma 'innee 'a'oothu bika minal-kufri, walfaqri, wa 'a'oothu bika min 'athaabil-qabri, laa 'ilaaha 'illaa 'Anta.'`,
            arabicVerse: `'اللَّهُمَّ عَافِـني فِي بَدَنِي، اللَّهُمَّ عَافِـنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُبِكَ مِنَ الْكُفْر، وَالفَقْرِ، وَأَعُوذُبِكَ مِنْ عَذَابِ الْقَبْرِ ، لَا إلَهَ إلاَّ أَنْتَ'`,
            reference: `'[Hisnul 82] [Abu Dawud 4/324, Ahmad 5/42, An-Nasa'i, Ibn As-Sunni (Hadith no. 69), Ibn Hibban (Hadith no. 2361).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/82hm.mp3',
          },

          {
            duaId: 9,
            englishTranslation: `'Allah is sufficient for me. There is none worthy of worship but Him. I have placed my trust in Him, He is Lord of the Majestic Throne. (Seven times)(Allah will grant whoever recites this Seven times in the morning or evening whatever he desires from this world or the next.)'`,
            transliteration: `'Hasbiyallaahu laa 'ilaaha 'illaa Huwa 'alayhi tawakkaltu wa Huwa Rabbul-'Arshil-'Adheem .'`,
            arabicVerse: `'حَسْبِيَ اللَّهُ لَآ إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ'`,
            reference: `'[Hisnul 83] [Ibn As-Sunni (no. 71), Abu Dawud 4/321, Ibn As-Sunni.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/83hm.mp3',
          },

          {
            duaId: 10,
            englishTranslation: `'O Allah, I seek Your forgiveness and Your protection in this world and the next. O Allah, I seek Your forgiveness and Your protection in my religion, in my worldly affairs, in my family and in my wealth. O Allah, conceal my secrets and preserve me from anguish. O Allah, guard me from what is in front of me and behind me, from my left, and from my right, and from above me. I seek refuge in Your Greatness from being struck down from beneath me.'`,
            transliteration: `'Allaahumma 'innee 'as'alukal-'afwa wal'aafiyata fid-dunyaa wal'aakhirati, Allaahumma 'innee 'as'alukal-'afwa wal'aafiyata fee deenee wa dunyaaya wa 'ahlee, wa maalee , Allaahum-mastur 'awraatee, wa 'aamin raw'aatee, Allaahum-mahfadhnee min bayni yadayya, wa min khalfee, wa 'an yameenee, wa 'an shimaalee, wa min fawqee, wa 'a'oothu bi'adhamatika 'an 'ughtaala min tahtee.'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي، وَدُنْيَايَ، وَأَهْلِي، وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِيَ'`,
            reference: `'[Hisnul 84] [Sahih Ibn Majah 2/332, Abu Dawud.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/84hm.mp3',
          },

          {
            duaId: 11,
            englishTranslation: `'O Allah, Knower of the unseen and the evident , Maker of the heavens and the earth, Lord of everything and its Possessor, I bear witness that there is none worthy of worship but You. I seek refuge in You from the evil of my soul and from the evil of Satan and his helpers. (I seek refuge in You) from bringing evil upon my soul and from harming any Muslim.'`,
            transliteration: `'Allaahumma 'Aalimal-ghaybi wash-shahaadati faatiras-samaawaati wal'ardhi, Rabba kulli shay'in wa maleekahu, 'ash-hadu 'an laa 'ilaaha 'illaa 'Anta, 'a'oothu bika min sharri nafsee, wa min sharrish-shaytaani wa shirkihi, wa 'an 'aqtarifa 'alaa nafsee soo'an, 'aw 'ajurrahu 'ilaa Muslimin.'`,
            arabicVerse: `'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّماوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ'`,
            reference: `'[Hisnul 85] [Sahih At-Tirmizi 3/142, Abu Dawud.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/85hm.mp3',
          },

          {
            duaId: 12,
            englishTranslation: `'In the Name of Allah, Who with His Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing. (Three times)(Whoever recites it in the morning will not be afflicted by any calamity before evening, and whoever recites it in the evening will not be overtaken by any calamity before morning.)'`,
            transliteration: `'Radheetu billaahi Rabban, wa bil-'Islaami deenan, wa bi-Muhammadin (sallallaahu 'alayhi wa sallama) Nabiyyan.'`,
            arabicVerse: `'رَضِيتُ باللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِيناً، وَبِمُحَمَّدٍ صَلَى اللَّهُ عَلِيهِ وَسَلَّمَ نَبِيَّاً'`,
            reference: `'[Hisnul 86] [Abu Dawud 4/323, At-Tirmizi 5/465, Ibn Majah 2/332, Ahmad.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/87hm.mp3',
          },

          {
            duaId: 13,
            englishTranslation: `'I am pleased with Allah as my Lord, with Islam as my religion and with Muhammad (peace and blessings of Allah be upon him) as my Prophet. (Three times)(Allah has promised that anyone who says every morning or evening will be pleased on the Day of Resurrection.)'`,
            transliteration: `'Bismillaahil-lathee laa yadhurru ma'as-mihi shay'un fil-'ardhi wa laa fis-samaa'i wa Huwas-Samee 'ul- 'Aleem.'`,
            arabicVerse: `'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الَْأرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ'`,
            reference: `'[Hisnul 87] [Ahmad 4/ 337, An-Nasa'i, Ibn As-Sunni (no. 68), At-Tirmizi 5/465.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/86hm.mp3',
          },

          {
            duaId: 14,
            englishTranslation: `'O Ever Living One, O Eternal One, by Your mercy I call on You to set right all my affairs. Do not place me in charge of my soul even for the blinking of an eye.'`,
            transliteration: `'Yaa Hayyu yaa Qayyoomu birahmatika 'astagheethu 'aslih lee sha'nee kullahu wa laa takilnee 'ilaa nafsee tarfata 'aynin.'`,
            arabicVerse: `'يَاحَيُّ، يَا قَيُّومُ، بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ'`,
            reference: `'[Hisnul 88] [Al-Hakim 1/545.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/88hm.mp3',
          },

          {
            duaId: 15,
            englishTranslation: `'We have entered the morning (evening) and with it all the dominion which belongs to Allah, Lord of all that exists. O Allah, I ask You for the goodness of this day, its victory, its help, its light, its blessings, and its guidance. I seek refuge in You from the evil that is in it and from the evil that follows it.(Recite in the bracket in the evening.)'`,
            transliteration: `'Asbahnaa wa 'asbahal-mulku (Amsaynaa wa 'amsal-mulku) lillaahi Rabbil-'aalameen, Allaahumma 'innee 'as'aluka khayra haathal-yawmi (laylati), Fathahu wa nasrahu wa noorahu, wa barakatahu, wa hudaahu, wa'a'oothu bika min sharri maafeehi wa sharri maa ba'dahu.'`,
            arabicVerse: `'أَصْبَحْنَا وَأَصْبَحَ (أَمْسَيْنا وَأَمْسَى) الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُمَّ إِنِّـي أَسْأَلُكَ خَـيْرَ هَذَا الْـيَوْمِ (اللَّـيْلَة)، فَتْحَهُ، وَنَصْرَهُ، وَنُورَهُ وَبَرَكَتَهُ، وَهُدَاهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهِ وَشَرِّ مَا بَعْدَهُ'`,
            reference:
              "Abû Dâwud [5084](4/322), Shu'aîb and 'Abdul Qadir Al-Arnâ'ûť declared its chain Ĥasan in their research of Zâd al-Ma'âd (2/273).",
            url: 'https://admin.gomasjid.co.uk/assets/dua/89hm.mp3',
          },

          {
            duaId: 16,
            englishTranslation: `'We have entered the morning (evening) upon the natural religion of Islam, the word of sincere devotion, the religion of our Prophet Muhammad (peace and blessings of Allah be upon him), and the faith of our father Ibrahim. He was upright (in worshipping Allah), and a Muslim. He was not of those who worship others besides Allah. (Recite in the bracket in the evening.)'`,
            transliteration: `''Asbahnaa ('Amsaynaa) 'alaa fitratil-'Islaami wa 'alaa kalimatil-'ikhlaasi, wa 'alaa deeni Nabiyyinaa Muhammadin, wa 'alaa millati 'abeenaa 'Ibraaheema, haneefan Musliman wa maa kaana minal-mushrikeen.'`,
            arabicVerse: `'أَصْبَحْنَا (أَمْسَيْنَا) عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الإِخْلَاصِ، وَعَلَى دِينِ نَبِـيِّنَا مُحَمَّدٍ، وَعَاـَى مِلَّـةِ أَبِينَا إِبْـرَاهِيـمَ، حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشْرِكِينَ'`,
            reference: `'[Hisnul 90] [Ahmad 3/406-7, 5/123, An-Nasa'i, At-Tirmizi 4/209.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/90hm.mp3',
          },

          {
            duaId: 17,
            englishTranslation: `'Glory is to Allah and praise is to Him. (100 times)(Whoever recites this one hundred times in the morning and in the evening will not be surpassed on the Day of Resurrection by anyone having done better than this except for someone who had recited it more.)'`,
            transliteration: `'Subhaanallaahi wa bihamdihi.'`,
            arabicVerse: `'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ'`,
            reference: `'[Hisnul 91] [Muslim 4/2071.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/91hm.mp3',
          },

          {
            duaId: 18,
            englishTranslation: `'None has the right to be worshiped but Allah alone, Who has no partner. His is the dominion and His is the praise and He is Able to do all things. (10 times or once if tired.)'`,
            transliteration: `'Laa 'ilaaha 'illallaahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu, wa Huwa 'alaa kulli shay'in Qadeer.'`,
            arabicVerse: `'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ'`,
            reference: `'[Hisnul 92] [An-Nasa'i, Abu Dawud 4/319, Ibn Majah, Ahmad 4/60.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/92hm.mp3',
          },

          {
            duaId: 19,
            englishTranslation: `'None has the right to be worshiped but Allah alone, Who has no partner. His is the dominion and His is the praise and He is Able to do all things. (100 times in in the morning.)(Whoever recites this hundred times in the morning, Allah swt will reward him of freeing ten slaves, Allah will write one hundred Hasanat and and forgive him one hundred misdeeds and be protected from Satan until evening.)'`,
            transliteration: `'Laa 'ilaaha 'illallaahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu, wa Huwa 'alaa kulli shay'in Qadeer.'`,
            arabicVerse: `'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ'`,
            reference: `'[Hisnul 93] [Al-Bukhari 4/95, Muslim 4/2071.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/93hm.mp3',
          },

          {
            duaId: 20,
            englishTranslation: `'Glory is to Allah and praise is to Him, by the multitude of His creation, by His Pleasure, by the weight of His Throne, and by the extent of His Words. (Three times in the morning.)'`,
            transliteration: `'Subhaanallaahi wa bihamdihi: 'Adada khalqihi, wa ridhaa nafsihi, wa zinata 'arshihi wa midaada kalimaatihi.'`,
            arabicVerse: `'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ'`,
            reference: `'[Hisnul 94] [Muslim 4/2090.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/94hm.mp3',
          },

          {
            duaId: 21,
            englishTranslation: `'O Allah, I ask You for knowledge that is of benefit, a good provision, and deeds that will be accepted. (Recite in the morning.)'`,
            transliteration: `'Allaahumma 'innee 'as'aluka 'ilman naafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan.'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً، وَ رِزْقاً طَيِّباً، وَ عَمَلاً مُتَقَبَّلاً'`,
            reference: `'[Hisnul 95] [Ibn As-Sunni (Hadith no. 54), Ibn Majah (Hadith no. 925).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/95hm.mp3',
          },

          {
            duaId: 22,
            englishTranslation: `'I seek the forgiveness of Allah and repent to Him. (100 times during the day.)'`,
            transliteration: `''Astaghfirullaaha wa 'atoobu 'ilayhi.'`,
            arabicVerse: `'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ'`,
            reference: `'[Hisnul 96] [Al-Bukhari, Muslim 4/2075.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/96hm.mp3',
          },

          {
            duaId: 23,
            englishTranslation: `'I seek refuge in the Perfect Words of Allah from the evil of what He has created. (Three times in the evening.)(Whoever recites this Three times in the evening will be protected from insect stings.)'`,
            transliteration: `''A'oothu bikalimaatil-laahit-taammaati min sharri maa khalaqa.'`,
            arabicVerse: `'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ'`,
            reference: `'[Hisnul 97] [Ahmad 2/ 290, An-Nasa'i, At-Tirmizi 3/187, Ibn As-Sunni (Hadith no. 68), Ibn Majah 2/266.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/97hm.mp3',
          },

          {
            duaId: 24,
            englishTranslation: `'Oh Allah, we ask you for peace and blessings upon our prophet Muhammad. (Ten times)(The Prophet saw said: "Who recites blessings upon me 10 times in the morning and 10 times in the evening will obtain my intercession on the Day of Resurrection".)'`,
            transliteration: `'Allahumma salli wa sallim 'alaa nabiyyinaa Muhammadin'`,
            arabicVerse: `'اللَّهُمَّ صَلِّ وَسَلَّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ'`,
            reference: `'[Hisnul 98] [At-Tabrani, Sahih at-Targhib wa at-Tarhib 1/273.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/98hm.mp3',
          },
        ],
      },

      {
        title: 'Before sleeping',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Recite Al-Ikhlas, Al-Falaq and An-Nas'`,
            transliteration: `'Qul huwa Allahu ahad, Allahu assamad, Lam yalid walam yoolad, Walam yakun lahu kufuwan ahad. Qul a'aoothu birabbi alfalaq, Min sharri ma khalaq, Wamin sharri ghasiqin ithawaqab, Wamin sharri annaffathatifee al'uqad, Wamin sharri hasidin itha hasad. Qul a'aoothu birabbi annas, Maliki annas, Ilahi annas, Min sharri alwaswasi alkhannas, Allathee yuwaswisu fee sudoori annas, Mina aljinnati wannas.'`,
            arabicVerse: `'قُلْ هُوَ اللَّـهُ أَحَدٌ، اللَّـهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ. قُلْ أَعُوذُ بِرَ‌بِّ الْفَلَقِ، مِن شَرِّ‌ مَا خَلَقَ، وَمِن شَرِّ‌ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ‌ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ‌ حَاسِدٍ إِذَا حَسَدَ. قُلْ أَعُوذُ بِرَ‌بِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَـٰهِ النَّاسِ، مِن شَرِّ‌ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ‌ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ.'`,
            reference: `'[Hisnul 99] [Al-Bukhari, Muslim 4/ 1723.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/76hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'Allah! There is no God but He, the Ever Living, the One Who sustains and protects all that exists. Neither slumber nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who is he that can intercede with Him except with His Permission? He knows what happens to them in this world, and what will happen to them in the Hereafter. And they will never encompass anything of His Knowledge except that which He wills. His Throne extends over the heavens and the earth, and He feels no fatigue in guarding and preserving them. And He is the Most High, the Most Great.(Whoever reads this when he lies down to sleep will have a guardian from Allah remain with him and Satan will not be able to come near him until he rises in the morning.)'`,
            transliteration: `'Allaahu laa 'ilaaha 'illaa Huwal-Hayyul-Qayyoom, laa ta'khuthuhu sinatun wa laa nawm, lahu maa fis-samaawaati wa maa fil-'ardh, man thal-lathee yashfa'u 'indahu 'illaa bi'ithnihi, ya'lamu maa bayna 'aydeehim wa maa khalfahum, wa laa yuheetoona bishay'im-min 'ilmihi 'illaa bimaa shaa'a, wasi'a kursiyyuhus-samaawaati wal'ardha, wa laa ya'ooduhu hifdhuhumaa, wa Huwal- 'Aliyyul- 'Adheem.'`,
            arabicVerse: `'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ'`,
            reference: `'[Hisnul 100] [Al-Baqarah 2:255, Al-Bukhari.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/100hm.mp3',
          },

          {
            duaId: 3,
            englishTranslation: `'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, (saying), "We make no distinction between any of His messengers." And they say, "We hear and we obey. (We seek) Your forgiveness, our Lord, and to You is the (final) destination."(1)Allah does not charge a soul except (with that within) its capacity. It will have (the consequence of) what (good) it has gained, and it will bear (the consequence of) what (evil) it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."(2)(These two Verses will be sufficient for anyone who recites them at night before sleeping.)Allah burdens not a person beyond what he can bear. He gets reward for that (good) which he has earned, and he is punished for that (evil) which he has earned. Our Lord! Punish us not if we forget or fall into error. Our Lord! Lay not on us a burden like that which You did lay on those before us. Our Lord! Put not on us a burden greater than we have strength to bear. Pardon us and grant us forgiveness. Have mercy on us. You are our Protector, and help us against the disbelieving people.'`,
            transliteration: `''Aamanar-Rasoolu bimaa 'unzila ilayhi mir-Rabbihi walmu'minoon, kullun 'aamana billaahi wa malaa'ikatihi wa Kutubihi wa Rusulihi, laa nufarriqu bayna 'ahadim-mir-Rusulihi, wa qaaloo sami'naa wa 'ata'naa ghufraanaka Rabbanaa wa 'ilaykal-maseer.(1)Laa yukallifullaahu nafsan 'illaa wus'ahaa, lahaa maa kasabat wa 'alayhaa mak-tasabat, Rabbanaa laa tu'aakhithnaa 'in naseenaa 'aw 'akhta'naa, Rabbanaa wa laa tahmil 'alaynaa 'isran kamaa hamaltahu 'alal-latheena min qablinaa, Rabbanaa wa laa tuhammilnaa maa laa taaqata lanaa bihi, wa'fu 'annaa, waghfir lanaa warhamnaa, 'Anta Mawlaanaa fansurnaa 'alal-qawmil-kaafireen.(2)'`,
            arabicVerse: `'(1)آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ وَقَالُوا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ(2)لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ'`,
            reference: `'[Hisnul 101] [Al-Baqarah 2:285-6, Al-Bukhari, Muslim 1/554.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/101hm.mp3',
          },

          {
            duaId: 4,
            englishTranslation: `'With Your Name my Lord, I lay myself down and with Your Name I rise. And if my soul You take, have mercy on it, and if You send it back then protect it as You protect Your righteous slaves.(If any of you rises from his bed and later returns to it, let him dust off his bed with his waist garment three times and mention the Name of Allah, for he does not know what may have entered the bed after him, and when he lies down he should say: بِسْمِ اللَّهِ'`,
            transliteration: `'Bismika Rabbee wadha'tu janbee , wa bika 'arfa'uhu, fa'in 'amsakta nafsee farhamhaa, wa 'in 'arsaltahaa fahfadhhaa, bimaa tahfadhu bihi 'ibaadakas-saaliheen.'`,
            arabicVerse: `'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ'`,
            reference: `'[Hisnul 102] [Al-Bukhari 11/126, Muslim 4/2084.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/102hm.mp3',
          },

          {
            duaId: 5,
            englishTranslation: `'O Allah, You have created my soul and You take it back. Unto You is its death and its life. If You give it life then protect it, and if You cause it to die then forgive it. O Allah, I ask You for strength.'`,
            transliteration: `'Allaahwmma 'innaka khalaqta nafsee wa 'Anta tawaffaahaa, laka mamaatuhaa wa mahyaahaa, 'in 'ahyaytahaa fahfadhhaa, wa 'in 'amattahaa faghfir lahaa . Allaahumma 'innee 'as'alukal-'aafiyata.'`,
            arabicVerse: `'اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فََاغْفِرْ لَهَا، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ'`,
            reference: `'[Hisnul 103] [Muslim 4/2083, Ahmad 2/79.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/103hm.mp3',
          },

          {
            duaId: 6,
            englishTranslation: `'O Allah, save me from Your punishment on the Day that You resurrect Your slaves. (Three times)(When the Prophet saw wanted to lie down to sleep, he used to place his right hand under his cheek and says this dua'.)'`,
            transliteration: `'Allaahumma qinee 'athaabaka yawma tab'athu 'ibaadaka.'`,
            arabicVerse: `'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ'`,
            reference: `'[Hisnul 104] [Abu Dawud 4/311, Sahih At-Tirmizi 3/143.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/104hm.mp3',
          },

          {
            duaId: 7,
            englishTranslation: `'In Your Name, O Allah, I die and I live.'`,
            transliteration: `'Bismika Allaahumma 'amootu wa 'ahyaa.'`,
            arabicVerse: `'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا'`,
            reference: `'[Hisnul 105] [Al-Bukhari, Muslim 4/2083.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/105hm.mp3',
          },

          {
            duaId: 8,
            englishTranslation: `'Glory is to Allah. (Thirty-three times)(1)praise is to Allah. (Thirty-three times)(2)Allah is the Most Great. (Thirty-four times)(3)'`,
            transliteration: `'Subhaanallaahi(1)Walhamdu lillaahi(2)Wallaahu 'akbar.(3)'`,
            arabicVerse: `'(1)سُبْحَانَ اللَّهِ(2)والْحَمْدُ للَّهِ(3)وَاللَّهُ أَكْبَرُ'`,
            reference: `'[Hisnul 106] [Al-Bukhari, Muslim 4/2091.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/106hm.mp3',
          },

          {
            duaId: 9,
            englishTranslation: `'O Allah! Lord of the Seven heavens and Lord of the Magnificent Throne. Our Lord and the Lord of everything. Splitter of the grain and the date-stone, Revealer of the Torah and the Injeel and the Furqan (the Qur'an), I seek refuge in You from the evil of everything that You shall seize by the forelock. O Allah You are the First and nothing has come before you, and You are the Last, and nothing may come after You. You are the Most High, nothing is above You and You are the Most Near and nothing is nearer than You. Remove our debts from us and enrich us against poverty.'`,
            transliteration: `'Allaahumma Rabbas-samaawaatis-sab'i wa Rabbal-'Arshil-'Adheem, Rabbanaa wa Rabba kulli shay 'in, faaliqal-habbi wannawaa , wa munzilat-Tawraati wal-'Injeeli, wal-Furqaani, 'a'oothu bika min sharri kulli shay 'in 'Anta 'aakhithun binaasiyatihi. Allaahumma 'Antal-'Awwalu falaysa qablaka shay'un, wa 'Antal-'Aakhiru falaysa ba'daka shay'un, wa 'Antadh-Dhaahiru falaysa fawqaka shay'un, wa 'Antal-Baatinu falaysa doonaka shay'un, iqdhi 'annad-dayna wa 'aghninaa minal-faqri.'`,
            arabicVerse: `'اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَى، وَمُنْزِلَ التَّوْرَاةِ، وَالْإِنجِيلِ، وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أّنْتَ آخِذٌ بِنَاصِيَتهِ. اللَّهُمَّ أَنْتَ الأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ، وَأَنْتَ الآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اِقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ'`,
            reference: `'[Hisnul 107] [Muslim 4/2084.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/107hm.mp3',
          },

          {
            duaId: 10,
            englishTranslation: `'Praise is to Allah Who has provided us with food and with drink, sufficed us and gave us an abode for how many are there with no provision and no home.'`,
            transliteration: `'Alhamdu lillaahil-lathee 'at'amanaa wa saqaanaa, wa kafaanaa, wa 'aawaanaa, fakam mimman laa kaafiya lahu wa laa mu'wiya.'`,
            arabicVerse: `'الْحَمْدُ للّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْويَ'`,
            reference: `'[Hisnul 108] [Muslim 4/2085.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/108hm.mp3',
          },

          {
            duaId: 11,
            englishTranslation: `'O Allah, Knower of the unseen and the evident, Maker of the heavens and the earth, Lord of everything and its Master, I bear witness that there is none worthy of worship but You. I seek refuge in You from the evil of my soul and from the evil of Satan and his helpers. (I seek refuge in You) from bringing evil upon my soul and from harming any Muslim.'`,
            transliteration: `'Allaahumma 'Aalimal-ghaybi wash-shahaadati faatiras-samaawaati wal'ardhi, Rabba kulli shay 'in wa maleekahu, 'ash-hadu 'an laa 'ilaaha 'illaa 'Anta, 'a'oothu bika min sharri nafsee, wa min sharrish-shaytaani wa shirkihi, wa 'an 'aqtarifa 'alaa nafsee soo 'an, 'aw 'ajurrahu 'ilaa Muslimin.'`,
            arabicVerse: `'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاواتِ والْأَرْضَ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ'`,
            reference: `'[Hisnul 109] [Abu Dawud 4/317, Sahih At-Tirmizi 3/142.]'`,
            url: '',
          },

          {
            duaId: 12,
            englishTranslation: `'Recite Surah 32 (As-Sajdah) and Surah 67 (Al-Mulk).'`,
            transliteration: `''`,
            arabicVerse: `'يقرأ الم تنزيل السجدة وتبارك الذي بيده الملك'`,
            reference: `'[Hisnul 110] [At-Tirmizi, An-Nasa'i, Sahih al-Jami' as-Saghir 4/255.]'`,
            url: '',
          },

          {
            duaId: 13,
            englishTranslation: `'O Allah, I submit myself to You, entrust my affairs to You, turn my face to You, and lay myself down depending upon You, hoping in You and fearing You. There is no refuge, and no escape, except to You. I believe in Your Book (the Qur'an) that You revealed, and the Prophet whom You sent.(Before you go to bed perform ablutions as you would for prayer, then lie down on your right side and says this dua'. Whoever says this and dies in his sleep, has died in a state of the natural monotheism (Fitrah).)'`,
            transliteration: `'Allaahumma 'aslamtu nafsee 'ilayka, wa fawwadhtu 'amree 'ilayka, wa wajjahtu wajhee 'ilayka, wa 'alja'tu dhahree 'ilayka, raghbatan wa rahbatan 'ilayka, laa maalja' wa laa manja minka 'illaa 'ilayka, 'aamantu bikitaabikal-lathee 'anzalta wa bi-nabiyyikal-lathee 'arsalta.'`,
            arabicVerse: `'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلاَ مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ'`,
            reference: `'[Hisnul 111] [Al-Bukhari, Muslim 4/2081.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/111hm.mp3',
          },
        ],
      },

      {
        title: 'When turning over during the night',
        data: [
          {
            duaId: 1,
            englishTranslation: `'There is none worthy of worship but Allah, the One, the Victorious, Lord of the heavens and the earth and all that is between them, the All-Mighty, the All-Forgiving. (This is to be said if you turn over in bed during the night.)'`,
            transliteration: `'Laa 'ilaaha 'illallaahul-Waahidul-Qahhaaru, Rabbus-samaawaati wal'ardhi wa maa baynahumal-'Azeezul-Ghaffaaru.'`,
            arabicVerse: `'لَا إِلَهَ إِلَّا اللَّهُ الْوَاحِدُ الْقَهَّارُ، رَبُّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا الْعَزِيزُ الْغَفَّارُ'`,
            reference: `'[Hisnul 112] [Al-Hakim, An-Nasa'i, Ibn As-Sunni.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/112hm.mp3',
          },
        ],
      },

      {
        title: 'Upon experience unrest, fear, apprehensiveness during sleep',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I seek refuge in the Perfect Words of Allah from His anger and His punishment, from the evil of His slaves and from the taunts of devils and from their presence.'`,
            transliteration: `''A'oothu bikalimaatil-laahit-taammaati min ghadhabihi wa 'iqaabihi, wa sharri 'ibaadihi, wa min hamazaatish-shayaateeni wa 'an yahdhuroon.'`,
            arabicVerse: `'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ'`,
            reference: `'[Hisnul 113] [Abu Dawud 4/12, Sahih At- Tirmithi 3/171.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/113hm.mp3',
          },
        ],
      },

      {
        title: 'Upon seeing a good or bad dream',
        data: [
          {
            duaId: 1,
            englishTranslation: `'1. Spit to your left. (Three times)2. Seek refuge in Allah from the Devil and from the evil of what you have seen. (Three times)3. Do not speak about it to anyone.4. Turn over on your other side.'`,
            transliteration: `''`,
            arabicVerse:
              'يَنْفُثُ عَن يَسَارِهِ (ثَلاثاً).\nيَسْتَعِيْذُ بِااللهِ مِنَ الشَّيْطَانِ، وَ مِنْ شَرِّ مَا رَأَى (ثَلاثَ مَرَّاتٍ).\nلَا يُحَدِّثُ بِهَا أحَداً.\nيتحَوَّلُ عَنْ جَنْبِهِ الَّذِي كَانَ عَلَيْهِ',
            reference: `'[Hisnul 114] [Muslim 4/1772, Muslim 4/1773.]'`,
            url: '',
          },

          {
            duaId: 2,
            englishTranslation: `'5. Get up and pray if you desire to do so.'`,
            transliteration: `''`,
            arabicVerse: 'يَقُومُ يُصَلِّي إنْ أرَادَ ذَلِكَ',
            reference: `'[Hisnul 115] [Muslim 4/1773.]'`,
            url: '',
          },
        ],
      },
    ],
  },
  {
    categoryId: 2,
    categoryName: 'Praising Allah',
    data: [
      {
        title: 'For seeking guidance in forming a decision',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, I seek the counsel of Your Knowledge, and I seek the help of Your Omnipotence, and I beseech You for Your Magnificent Grace. Surely, You are Capable and I am not. You know and I know not, and You are the Knower of the unseen. O Allah, if You know that this matter (mention the matter) is good for me in my religion and in my life and for my welfare in the life to come in both the short term and the long term, then ordain it for me and make it easy for me, then bless me in it. And if You know that this matter is bad for me in my religion and in my life and for my welfare in the life to come in both the short term and the long term, then distance it from me, and distance me from it, and ordain for me what is good wherever it may be, and help me to be content with it.'`,
            transliteration: `'Allaahumma 'innee 'astakheeruka bi'ilmika, wa 'astaqdiruka biqudratika, wa 'as'aluka min fadhtikal-'Adheemi, fa'innaka taqdiru wa laa 'aqdiru, wa ta'lamu, wa laa 'a'lamu, wa 'Anta 'Allaamul-Ghuyoobi, Allaahumma 'in kunta ta'lamu 'anna haathal-'amra-(then mention the thing to be decided) Khayrun lee fee deenee wa ma'aashee wa 'aaqibati 'amree, faqdurhu lee wa yassirhu lee thumma baarik lee feehi, wa 'in kunta ta'lamu 'anna haathal-'amra sharrun lee fee deenee wa ma'aashee wa 'aaqibati 'amree, fasrifhu 'annee wasrifnee 'anhu waqdur liyal-khayra haythu kaana thumma 'ardhinee bihi.'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي أَسْتَخِيـرُكَ بِعِلْمَكَ، وَأسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلاَّمُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الَأمْرَ (وَيُسَمِّي حَاجَتَه) خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ'`,
            reference: `'[Hisnul 74] [Al-Bukhari 7/162, Al-'Imran 3:159.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/74hm.mp3',
          },
        ],
      },

      {
        title: 'For one whos affairs have become difficult',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, there is no ease other than what You make easy. If You please You ease sorrow.'`,
            transliteration: `'Allaahumma laa sahla 'illaa maal ja'altahu sahlan wa 'Anta taj'alul-hazna 'ithaa shi'ta sahlan.'`,
            arabicVerse: `'اللَّهُمَّ لَا سَهْلَ إِلَاَّ مَا جَعَلتَهُ سَهْلاً وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً'`,
            reference: `'[Hisnul 139] [Ibn Hibban (Hadith no. 2427), Ibn As- Sunni (Hadith no. 351).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/139hm.mp3',
          },
        ],
      },

      {
        title: 'Upon committing a sin',
        data: [
          {
            duaId: 1,
            englishTranslation: `'There is not any slave of Allah who commits a sin, then he perfects his ablution and stands to pray two rak'ah of prayer, then seeks Allah's forgiveness, except that Allah will forgive him.'`,
            transliteration: `''`,
            arabicVerse:
              'مَا مِنْ عَبْدٍ يُذْنِبُ ذَنْباً فَيُحْسِنُ الطُّهُورَ، ثُمَّ يَقُومُ فَيُصَلِّي رَكْعَتَيْنِ، ثُمَّ يَسْتَغْفِرُاللهَ إلَّا غَفَرَ اللهُ لَهُ',
            reference: `'[Hisnul 140] [Abu Dawud 2/86, At-Tirmizi 2/257.]'`,
            url: '',
          },
        ],
      },

      {
        title: 'When stricken with a mishap or overtaken by an affair',
        data: [
          {
            duaId: 1,
            englishTranslation: `'It is the Decree of Allah and He does whatever He wills.(The strong believer is better and more dear to Allah than the weak believer, and in each of them there is good. Be vigilant for what is to your benefit and seek the help of Allah and do not falter. But when you are stricken by some setback, do not say: "If only I had done such and such..." rather say: "It is the Decree of Allah and He does whatever He wills". For verily the saying 'if...' begins the work of the Devil.)'`,
            transliteration: `'Qadarullaahi wa maa shaa'afa'ala.'`,
            arabicVerse: `'قَدَّرَ اللَّهُ وَمَا شَاءَ فَعَلَ'`,
            reference: `'[Hisnul 144] [Muslim 4/2052.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/144hm.mp3',
          },
        ],
      },

      {
        title: 'Protection from the Dajjal',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Whoever memorizes ten 'ayat (Verses) from the beginning of Surat Al-Kahf, will be protected from the False Messiah. If he recites them in every prayer after the final Tashahhud before ending the prayer, seeking the protection of Allah from the trials of the False Messiah.'`,
            transliteration: `''`,
            arabicVerse:
              'مَنْ حَفِظَ عَشَرَ آيَاتٍ مِنْ أوُّلِ سُورَةِ الكَهْفِ، عُصِمَ مِنَ الدَّجَّالِ',
            reference: `'[Hisnul 199] [Muslim 1/555, Muslim 1/556.]'`,
            url: '',
          },
        ],
      },

      {
        title: 'Excellence of sending prayers upon the Prophet saws',
        data: [
          {
            duaId: 1,
            englishTranslation: `'The Prophet (SAW) said: "Whoever prays for Allah's blessings upon me once, will be blessed for it by Allah ten times".'`,
            transliteration: `''`,
            arabicVerse:
              'قَالَ ﷺ: «مَنْ صَلَّ عَلَيَّ صَلاةً صَلَّ اللهُ عَلَيْهِ بِهَا عَشَراً»',
            reference: `'[Hisnul 219] [Muslim 1/288.]'`,
            url: '',
          },

          {
            duaId: 2,
            englishTranslation: `'The Prophet (SAW) said: Do not make my grave a place of ritual celebration, but pray for Allah's blessings upon me, for your blessings reach me from wherever you are.'`,
            transliteration: `''`,
            arabicVerse:
              'قَالَ ﷺ: «لا تَجْعَلُوا قَبْرِيْ عِيْداً وَ صَلُّوا عَلَيَّ فَإِنَّ صَلاتَكُمْ تَبْلُغُنِي حَيْثُ كُنْتُمْ»',
            reference: `'[Hisnul 220] [Abu Dawud 2/218, Ahmad 2/367.]'`,
            url: '',
          },

          {
            duaId: 3,
            englishTranslation: `'The Prophet (SAW) said: The miser is the one in whose presence I am mentioned yet does not pray for Allah's blessings upon me.'`,
            transliteration: `''`,
            arabicVerse:
              'قَالَ ﷺ: «البَخِيْلُ مَنْ ذُكِرْتُ عِنْدَهُ فَلَمْ يُصَلِّ عَلَيَّ»',
            reference: `'[Hisnul 221] [At-Tirmizi 5/551.]'`,
            url: '',
          },

          {
            duaId: 4,
            englishTranslation: `'The Prophet (SAW) said: Indeed Allah has angels who roam the earth and they convey to me the greetings (or prayers of peace) of my 'ummah (nation).'`,
            transliteration: `''`,
            arabicVerse:
              'قَالَ ﷺ: «إنَّ لِلَّهِ مَلائِكَةً سَيَّا حِيْنَ فِي الأرْضِ، يُبَلِّغُونِي مِنْ أُمَّتِي السَّلامَ»',
            reference: `'[Hisnul 222] [An-Nasa'i, Al-Hakim 2/421.]'`,
            url: '',
          },

          {
            duaId: 5,
            englishTranslation: `'The Prophet (SAW) said: No one sends greetings (or prayers of peace) upon me but Allah returns my soul to me so that I may return his greetings.'`,
            transliteration: `''`,
            arabicVerse:
              'قَالَ ﷺ: «مَا مِنْ أحَدٍ يُسَلِّمُ عَلَيَّ، إلَّا رَدَّ اللهُ عَلَيَّ رُوْحي، حَتَّى أرُدَّ عَلَيْهِ السَّلامَ»',
            reference: `'[Hisnul 223] [Abu Dawud (Hadith no. 2041).]'`,
            url: '',
          },
        ],
      },

      {
        title: 'Seeking forgiveness and repentance',
        data: [
          {
            duaId: 1,
            englishTranslation: `'The Prophet (SAW) said: "By Allah, I seek the forgiveness of Allah, and repent to Him more than Seventy times in a day".'`,
            transliteration: `''`,
            arabicVerse:
              'قَالَ رَسُولُ اللهِ ﷺ: «وَ اللهِ إِنِّي لأسْتَغْفِرُ اللهَ وَ أ تُوبُ إلَيْهِ فِي اليَوْمِ أكثَرَ مِنْ سَبْعِيْنَ مَرَّةٍ»',
            reference: `'[Hisnul 248] [Al-Bukhârî [6307](11/101).]'`,
            url: '',
          },

          {
            duaId: 2,
            englishTranslation: `'The Prophet (SAW) said: "O people, repent to Allah, for I verily repent to Him one hundred times a day".'`,
            transliteration: `''`,
            arabicVerse:
              'قَالَ رَسُولُ اللهِ ﷺ: «يَا أَيُّهَا النَّاسُ تُوبُوا إلَى اللهِ، فَإِنِّي أتُوبُ إلَيْهِ مِئَةَ مَرَّةٍ»',
            reference: `'[Hisnul 249] [Muslim 4/2076.]'`,
            url: '',
          },

          {
            duaId: 3,
            englishTranslation:
              'I seek Allah’s forgiveness, besides whom, none has the right to be worshipped except He, The Ever Living, The Self-Subsisting and Supporter of all, and I turn to Him in repentance.',
            transliteration: ``,
            arabicVerse:
              'قَالَ رَسُولُ اللهِ ﷺ: «مَنْ قَالَ أسْتَغْفِرُ اللهَ العَظِيْمَ الَّذِي لَا إلَهَ إلَّا هُوَ الحَيُّ القَيُّومُ وَ أتُوبُ إلَيْهِ، غَفَرَ للهُ لَهُ، وَ إنْ كَانَ فَرَّ مِنَ الزَّحْفِ»',
            reference:
              "Abû Dâwud [1517](2/85), At-Tirmidhî [3577](5/569), Al-Hâkim (1/511)  and he authenticated it and Adh-Dhahabî agreed with him. Al-Albânî authenticated it, see Ŝaĥîĥ At-Tirmidhî (3/182) and Al-Jâmi' Al-'Uŝûl Li-Ahâdîth Al-Rasûl (4/389-390) with research by Arnâ'ûť.",
            url: 'https://admin.gomasjid.co.uk/assets/dua/250hm.mp3',
          },

          {
            duaId: 4,
            englishTranslation: `'The Prophet (SAW) said: "The closest that the Lord comes to the slave is in the last portion of the night. So, if you are able to be among those who remember Allah in this hour, then be among them".'`,
            transliteration: `''`,
            arabicVerse:
              'قَالَ رَسُولُ اللهِ ﷺ: «أقْرَبُ مَا يَكُونُ الرَّبُّ مِنَ العَبْدِ، فِي جَوْفِ اللَّيْلِ الآخِرِ؛ فَإنْ اسْتَطَعْتَ أنْ تَكُونَ مِمَّنْ يَذْكُرُ اللهَ فِي تِلْكَ السَّاعَةِ؛ فَكُنْ»',
            reference: `'[Hisnul 251] [At-Tirmizi, An-Nasa'i 1/279 and Al-Hakim.]'`,
            url: '',
          },

          {
            duaId: 5,
            englishTranslation: `'The Prophet (SAW) said: "The closest that the slave comes to his Lord is when he is prostrating, so invoke Allah much (in prostration)".'`,
            transliteration: `''`,
            arabicVerse:
              'قَالَ رَسُولُ اللهِ ﷺ: «أقْرَبُ مَا يَكُونُ العَبْدُ مِنْ رَبِّهِ، وَ هُوَ سَاجِدٌ فَأكْثِرُوا الدُّعَاءَ»',
            reference: `'[Hisnul 252] [Muslim 1/350.]'`,
            url: '',
          },

          {
            duaId: 6,
            englishTranslation: `'The Prophet (SAW) said: "Verily my heart becomes preoccupied, and verily I seek Allah's forgiveness a hundred times a day".'`,
            transliteration: `''`,
            arabicVerse:
              'قَالَ رَسُولُ اللهِ ﷺ: «إنَّهُ لَيُغَانُ عَلَى قَلْبِي، وَ إنِّي لأسْتَغْفِرُ اللهَ فِي اليَوْمِ مِئَةَ مَرَّةٍ»',
            reference: `'[Hisnul 253] [Muslim 4/2075.]'`,
            url: '',
          },
        ],
      },

      {
        title: 'Excellence of remembrance and glorification of Allah',
        data: [
          {
            duaId: 1,
            englishTranslation: `'The Prophet (SAW) said: "Whoever says: "Glorified is Allah and praised is He" one hundred times a day, will have his sins forgiven even if they are like the foam of the sea".'`,
            transliteration: `'Subhaanallaahi wa bihamdihi.'`,
            arabicVerse: `'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ'`,
            reference: `'[Hisnul 254] [Al-Bukhari 7/168, Muslim 4/2071.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/254hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'The Prophet (SAW) said: "Whoever says: "None has the right to be worshiped but Allah alone, Who has no partner. His is the dominion and His is the praise, and He is Able to do all things" ten times, will have the reward for freeing four slaves from the Children of Isma'il".'`,
            transliteration: `'Laa 'ilaaha 'illallaahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu wa Huwa 'alaa kulli shay'in Qadeer.'`,
            arabicVerse:
              'قَالَ رَسُولُ اللهِ ﷺ: «مَنْ قَالَ: لَا إلَهَ إلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ المُلْكُ، وَ لَهُ الحَمْدُ، وَ هُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ عَشْرَ مِرَارٍ، كَانَ كَمَنْ أعْتَقَ أرْبَعَةَ أنْفُسٍ مِنْ وَلَدِ إسْمَاعِيلَ»',
            reference: `'[Hisnul 255] [Al-Bukhari 7/67, Muslim 4/2017.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/255hm.mp3',
          },

          {
            duaId: 3,
            englishTranslation: `'The Prophet (SAW) said: "Two words are light on the tongue, weigh heavily in the balance, and are loved by the Most Merciful One is: "Glorified is Allah and praised is He, Glorified is Allah the Most Great".'`,
            transliteration: `'Subhaanal-laahi wa bihamdihi, Subhaanal-laahil-'Adheem.'`,
            arabicVerse: `'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ وسُبْحَانَ اللَّهِ الْعَظِيمِ'`,
            reference: `'[Hisnul 256] [Al-Bukhari 7/168, Muslim 4/2072.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/256hm.mp3',
          },

          {
            duaId: 4,
            englishTranslation: `'The Prophet (SAW) said: For me to say: "Glory is to Allah, and praise is to Allah, and there is none worthy of worship but Allah, and Allah is the Most Great" is dearer to me than all that the sun rises upon".'`,
            transliteration: `'Subhaanallaahi, walhamdu lillaahi, wa laa 'ilaaha 'illallaahu, wallaahu 'Akbar.'`,
            arabicVerse: `'سُبْحَانَ اللَّهِ، وَالحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ'`,
            reference: `'[Hisnul 257] [Muslim 4/2072.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/257hm.mp3',
          },

          {
            duaId: 5,
            englishTranslation: `'The Prophet (SAW) said: "Is anyone of you incapable of earning one thousand Hasanah (rewards) in a day?" Someone from his gathering asked: "How can anyone of us earn a thousand Hasanah" He said: "Glorify Allah a hundred times and a thousand Hasanah will be written for you, or a thousand sins will be wiped away".'`,
            transliteration: `'Subhaanallaahi.'`,
            arabicVerse: `'سُبْحَانَ اللَّهِ'`,
            reference: `'[Hisnul 258] [Muslim 4/2073.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/258hm.mp3',
          },

          {
            duaId: 6,
            englishTranslation: `'The Prophet (SAW) said: "Glorified is Allah the Most Great and praised is He. Will have a date palm planted for him in Paradise".'`,
            transliteration: `'Subhaanallaahil-'Adheemi wa bihamdihi.'`,
            arabicVerse: `'سُبْحَانَ اللَّهِ الْعَظِيمِ وبِحَمْدِهِ'`,
            reference: `'[Hisnul 259] [At-Tirmizi 5/511, and Al-Hakim.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/259hm.mp3',
          },

          {
            duaId: 7,
            englishTranslation: `'The Prophet (SAW) said: "O Abdullah bin Qais, should I not point you to one of the treasures of Paradise?" I said: "Yes, O Messenger of Allah". So he told me to say: "There is no power and no might except by Allah".'`,
            transliteration: `'Laa hawla wa laa quwwata 'illaa billaah.'`,
            arabicVerse: `'لَا حَوٍلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ'`,
            reference: `'[Hisnul 260] [Al-Bukhari, Muslim 4/2076.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/260hm.mp3',
          },

          {
            duaId: 8,
            englishTranslation: `'The Prophet (SAW) said: "The most beloved words to Allah are four:Glorified is Allah,(1)The praise is for Allah,(2)There is none worthy of worship but Allah,(3)Allah is the Most Great".(4)'`,
            transliteration: `'Subhaanallaah,(1)Walhamdu lillaah,(2)Wa laa 'ilaaha 'illallaah,(3)Wallaahu 'Akbar.(4)'`,
            arabicVerse: `'(1)سُبْحَانَ اللَّهِ(2)وَالحَمْدُ للَّهِ(3)وَلَا إِلَهَ إِلاَّ اللَّهُ(4)وَاللَّهُ أَكْبَرُ'`,
            reference: `'[Hisnul 261] [Muslim 3/1685.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/261hm.mp3',
          },

          {
            duaId: 9,
            englishTranslation: `'A desert Arab came to Allah's Messenger (SAW) and said: "Teach me a word that I can say". The Prophet told him to say: "There is none worthy of worship but Allah, Who has no partner, Allah is the Great, the Most Great, and praise is to Allah in abundance, glory is to Allah, Lord of the worlds. There is no power and no might but by Allah the Mighty, the Wise". (1) He said: "That is for my Lord, but what about me?" The Prophet (SAW) told him to say: "O Allah forgive me, and have mercy on me and guide me, and provide for me". (2)'`,
            transliteration: `'Laa 'ilaaha 'illallaahu wahdahu laa shareeka lahu, Allaahu 'Akbaru kabeeran, walhamdu lillaahi katheeran, Subhaanallaahi Rabbil-'aalameen, laa hawla wa laa quwwata 'illaa biilaahil-'Azeezil-Hakeem.'`,
            arabicVerse: `'(1)لَا إِلهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، اللَّهُ أَكْبَرُ كَبيراً، وَالْحَمْدُ للَّهِ كَثيراً، سُبْحَانَ اللَّهِ رَبِّ الْعَالَمِينَ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَزِيزِ الْحَكِيمِ(2)اللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَارْزُقْنِي'`,
            reference: `'[Hisnul 262] [Muslim 4/2072.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/262hm.mp3',
          },

          {
            duaId: 10,
            englishTranslation: `'O Allah forgive me, and have mercy on me and guide me and give me good health and provide for me.'`,
            transliteration: `'Allaahummaghfir lee, warhamnee, wahdinee, wa 'aafinee warzuqnee.'`,
            arabicVerse: `'اللَّهُمَّ اغْفِرِ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَعَافِنِي وَارْزُقْنِي'`,
            reference: `'[Hisnul 263] [Muslim 4/2073.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/263hm.mp3',
          },

          {
            duaId: 11,
            englishTranslation: `'The most excellent invocation is:"Praise is for Allah".(1)"There is none worthy of worship but Allah".(2)'`,
            transliteration: `'Alhamdu lillaah.(1)Laa'ilaaha'illallaah.(2)'`,
            arabicVerse: `'(1)الْحَمْدُ لِلَّهِ(2)لَا إِلَه إِلَّا اللَّهُ'`,
            reference: `'[Hisnul 264] [At-Tirmizi 5/462, Ibn Majah 2/1249, and Al-Hakim.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/264hm.mp3',
          },

          {
            duaId: 12,
            englishTranslation: `'The good deeds which endure are: "Glorified is Allah, The praise is for Allah, There is none worth of worship but Allah, Allah is the Most Great and There is no power and no might except by Allah".'`,
            transliteration: `'Subhaanallaah, Walhamdu lillaah, Wa laa 'ilaaha 'illallaah, Wallaahu 'Akbar and Wa laa hawla wa laa quwwata 'illaa billaah.'`,
            arabicVerse: `'سُبْحَانَ اللَّهِ، وَالْحَمْدُ للَّهِ، لَا إِلَهَ إَلَّا اللَّهُ واللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إلَّا باللَّهِ'`,
            reference: `'[Hisnul 265] [Ahmad (Hadith no. 513).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/265hm.mp3',
          },
        ],
      },

      {
        title: 'How the Prophet made Tasbeeh',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Abdullah Bin Amru said: "I saw the Prophet (SAW) counting the glorification of his Lord on his right hand".'`,
            transliteration: `''`,
            arabicVerse:
              'عَنْ عَبْدِ اللهِ بْنِ عَمْروٍ قَالَ: رَأيْتُ النَّبِيَّ يَعْقِدُ التَّسْبِيْحَ بِيَمِيْنِهِ',
            reference: `'[Hisnul 266] [Abu Dawud, At-Tirmizi 5/521.]'`,
            url: '',
          },
        ],
      },
    ],
  },

  {
    categoryId: 3,
    categoryName: 'Food & Drinks',
    data: [
      {
        title: 'Upon breaking fast',
        data: [
          {
            duaId: 1,
            englishTranslation: `'The thirst is gone, the veins are moistened and the reward is confirmed, if Allah wills.'`,
            transliteration: `'Thahabadh-dhama'u wabtallatil-'urooqu, wa thabatal-'ajru 'inshaa'Allaah.'`,
            arabicVerse: `'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ'`,
            reference: `'[Hisnul 176] [Abu Dawud 2/306.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/176hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah, I ask You by Your mercy, which encompasses all things, that You forgive me.'`,
            transliteration: `'Allaahumma 'innee 'as'aluka birahmatikal-latee wasi'at kulla shay'in 'an taghfira lee.'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي أَسْأَلُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلِّ شَيْءٍ، أَنْ تَغْفِرَ لِي'`,
            reference: `'[Hisnul 177] [Ibn Majah 1/557.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/177hm.mp3',
          },
        ],
      },

      {
        title: 'Before eating',
        data: [
          {
            duaId: 1,
            englishTranslation: `'With the Name of Allah.(1)(If you forgot) With the Name of Allah, in the beginning and in the end.(2)'`,
            transliteration: `'Bismillaah.(1)Bismillaahifee 'awwalihi wa 'aakhirihi.(2)'`,
            arabicVerse: `'(1)ِبِسْمِ اللَّه(2)بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِه'`,
            reference: `'[Hisnul 178] [Abu Dawud 3/347, At-Tirmizi 4/288.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/178hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'Whomever Allah has given food, should say: "O Allah, bless us in it and provide us with better than it".(1)Whomever Allah has given milk to drink, should say: "O Allah, bless us in it and give us more of it".(2)'`,
            transliteration: `'Allaahumma baarik lanaafeehi wa 'at'imnaa khayranminhu.(1)Allaahumma baarik lanaa feehi wa zidnaa minhu.(2)'`,
            arabicVerse: `'(1)اللَّهُمَّ بَارِكْ لَنَا فيهِ وَأَطْعِمْنَا خَيْراً مِنْهُ(2)اللّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ'`,
            reference: `'[Hisnul 179] [At-Tirmizi 5/506.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/179hm.mp3',
          },
        ],
      },

      {
        title: 'Upon completing the meal',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Praise is to Allah Who has given me this food and sustained me with it though I was unable to do it and powerless.'`,
            transliteration: `'Alhamdu lillaahil-lathee 'at'amanee haathaa, wa razaqaneehi, min ghayri hawlin minnee wa laa quwwatin.'`,
            arabicVerse: `'الْحَمْدُ للَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ'`,
            reference: `'[Hisnul 180] [At-Tirmizi, Abu Dawud, Ibn Majah.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/180hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'All praise is to Allah, praise in abundance, good and blessed. It cannot (be compensated for, nor can it) be left, nor can it be done without, our Lord.'`,
            transliteration: `'Alhamdu lillaahi hamdan katheeran tayyiban mubaarakan feehi, ghayra makfiyyin wa laa muwadda'in, wa laa mustaghnan 'anhu Rabbanaa.'`,
            arabicVerse: `'الْحَمْدُ للَّهِ حَمْداً كَثِيراً طَيِّباً مُبارَكاً فِيهِ، غَيْرَ مَكْفِيٍّ وَلِا مُوَدَّعٍ، وَلَا مُسْتَغْنىً عَنْهُ رَبَّنَا'`,
            reference: `'[Hisnul 181] [Al-Bukhari 6/214, At-Tirmizi 5/507.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/181hm.mp3',
          },
        ],
      },

      {
        title: 'Of the guest for the host',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, bless them in what You have provided for them, and forgive them and have mercy on them.'`,
            transliteration: `'Allaahumma baarik lahum feemaa razaqtahum, waghfir lahum warhamhum.'`,
            arabicVerse: `'اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ'`,
            reference: `'[Hisnul 182] [Muslim 3/1615.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/182hm.mp3',
          },
        ],
      },

      {
        title: 'To one offering a drink or to one who intended to do that',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, feed the one who has fed me and drink to the one who has given me drink.'`,
            transliteration: `'Allaahumma 'at'im man 'at'amanee wasqi man saqaanee.'`,
            arabicVerse: `اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي، وَاسْقِ مَنْ سَقَانِي'`,
            reference: `'[Hisnul 183] [Muslim 3/126.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/183hm.mp3',
          },
        ],
      },

      {
        title: 'When breaking fast in someone’s home',
        data: [
          {
            duaId: 1,
            englishTranslation: `'With you, those who are fasting have broken their fast, you have fed those who are righteous, and the angels recite their prayers upon you.'`,
            transliteration: `''Aftara 'indakumus-saa'imoona, wa 'akala ta'aamakumul-'abraaru , wa sallat 'alaykumul-malaa'ikatu.'`,
            arabicVerse: `'أَفْطَرَ عِنْدَكُمْ الصَّائِمُونَ، وَأَكَلَ طَعَامَكُمُ الَأبْرَارُ، وَصَلَّتْ عَلَيْكُمُ الْمَلاَئِكَةُ'`,
            reference: `'[Hisnul 184] [Abu Dawud 3/367, Ibn Majah 1/556, An-Nasa'i.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/184hm.mp3',
          },
        ],
      },

      {
        title:
          'By one fasting when presented with food and does not break his fast',
        data: [
          {
            duaId: 1,
            englishTranslation: `'When you are invited (to eat) then reply to the invitation. If you are fasting then invoke Allah's blessings (on your host), and if you are not fasting then eat.'`,
            transliteration: `''`,
            arabicVerse:
              'إذَا دُعِيَ أحَدُكُمْ فَلْيُجِبْ، فَإنْ كَانَ صَائِمًا فَلْيُصَلِّ، وَ إنْ كَانَ مُفْطِراً فَلْيَطْعَمْ (وَ مَعنَى فَلْيُصَلِّ؛ أيْ: فَلْيَدْعُ)',
            reference: `'[Hisnul 185] [Muslim 2/1054.]'`,
            url: '',
          },
        ],
      },
    ],
  },

  {
    categoryId: 4,
    categoryName: 'Joy & Sorrow',
    data: [
      {
        title: 'For anxiety and sorrow',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, I am Your slave and the son of Your male slave and the son of your female slave. My forehead is in Your Hand (i.e. You have control over me). Your Judgment upon me is assured and Your Decree concerning me is just. I ask You by every Name that You have named Yourself with, revealed in Your Book, taught any one of Your creation or kept unto Yourself in the knowledge of the unseen that is with You, to make the Qur'an the spring of my heart, and the light of my chest, the banisher of my sadness and the reliever of my distress.'`,
            transliteration: `'Allaahumma 'innee 'abduka, ibnu 'abdika, ibnu 'amatika, naasiyatee biyadika, maadhin fiyya hukmuka, 'adlun fiyya qadhaa'uka, 'as'aluka bikulli ismin huwa laka, sammayta bihi nafsaka, 'aw 'anzaltahu fee kitaabika, 'aw 'allamtahu 'ahadan min khalqika, 'awista'tharta bihi fee 'ilmil-ghaybi 'indaka, 'an taj'alal-Qur'aana rabee'a qalbee, wa noora sadree, wa jalaa'a huznee, wa thahaaba hammee .'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْـدِكَ، ابْنُ أَمَتِـكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَداً مِنْ خَلْقِـكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الغَيْبِ عِنْـدَكَ، أَنْ تَجْعَلَ القُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وجَلَاءَ حُزْنِي وذَهَابَ هَمِّي'`,
            reference: `'[Hisnul 120] [Ahmad 1/391, and Al-Albani graded it authentic.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/120hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah, I seek refuge in you from grief and sadness, from weakness and from laziness, from miserliness and from cowardice, from being overcome by debt and overpowered by men.'`,
            transliteration: `'Allaahumma 'innee 'a'oothu bika minal-hammi walhazani, wal'ajzi walkasali, walbukhli waljubni, wa dhala'id-dayni wa ghalabatir-rijaal.'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي أَعْوذُ بِكَ مِنَ الهَمِّ وَ الْحَزَنِ، وَالعَجْزِ وَالْكَسَلِ، والبُخْلِ والْجُبْنِ، وضَلَعِ الدَّيْنِ وغَلَبَةِ الرِّجَالِ'`,
            reference: `'[Hisnul 121] [Al-Bukhari 7/158.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/121hm.mp3',
          },
        ],
      },

      {
        title: 'For one in distress',
        data: [
          {
            duaId: 1,
            englishTranslation: `'There is none worthy of worship but Allah the Mighty, the Forbearing. There is none worthy of worship but Allah, Lord of the Magnificent Throne. There is none worthy of worship but Allah, Lord of the heavens and Lord of the earth, and Lord of the Noble Throne.'`,
            transliteration: `'Laa 'ilaaha 'illallaahul-'Adheemul-Haleem, laa 'ilaaha 'illallaahu Rabbul-'Arshil-'Adheem, laa 'ilaaha 'illallaahu Rabbus-samaawaati wa Rabbul-'ardhi wa Rabbul-'Arshil-Kareem.'`,
            arabicVerse: `'لَا إلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمْ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ العَرْشِ العَظِيمُ، لَا إِلَهَ إِلَّا اللَّهْ رَبُّ السَّمَوَاتِ وَرَبُّ الأَرْضِ وَرَبُّ العَرْشِ الْكَرِيمُ'`,
            reference: `'[Hisnul 122] [Al-Bukhari 8/154, Muslim 4/2092.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/122hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah, I hope for Your mercy. Do not leave me to myself even for the blinking of an eye. Correct all of my affairs for me. There is none worthy of worship but You.'`,
            transliteration: `'Allaahumma rahmataka 'arjoo falaa takilnee 'ilaa nafsee tarfata 'aynin, wa 'aslih lee sha'nee kullahu, laa'ilaaha 'illaa 'Anta.'`,
            arabicVerse: `'اللَّهُمَّ رَحْمَتَكَ أَرْجُوفَلَا تَكِلْنِي إِلىَ نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ'`,
            reference: `'[Hisnul 123] [Abu Dawud 4/324, Ahmad 5/42.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/123hm.mp3',
          },

          {
            duaId: 3,
            englishTranslation: `'There is none worthy of worship but You, glory is to You. Surely, I was among the wrong doers.'`,
            transliteration: `'Laa 'ilaaha 'illaa 'Anta subhaanaka 'innee kuntu minadh-dhaalimeen.'`,
            arabicVerse: `'لَا إِلَهَ إِلَّا أَنْت سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ'`,
            reference: `'[Hisnul 124] [At-Tirmizi 5/529. Al-Hakim.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/124hm.mp3',
          },

          {
            duaId: 4,
            englishTranslation: `'Allah, Allah is my Lord. I do not associate anything with Him.'`,
            transliteration: `'Allaahu Allaahu Rabbee laa 'ushriku bihishay'an.'`,
            arabicVerse: `'اللَّهُ اللَّهُ رَبِّ لَا أُشْرِكُ بِهِ شَيْئاً'`,
            reference: `'[Hisnul 125] [Abu Dawud 2/87.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/125hm.mp3',
          },
        ],
      },

      {
        title: 'Upon encountering an enemy or those of authority',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, we ask You to restrain them by their necks and we seek refuge in You from their evil.'`,
            transliteration: `'Allaahumma 'innaa naj'aluka fee nuhoorihim wa na'oothu bika min shuroorihim.'`,
            arabicVerse: `'اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ'`,
            reference: `'[Hisnul 126] [Abu Dawud 2/89, Al-Hakim.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/126hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah, You are my strength and You are my support. For Your sake I go forth and for Your sake I advance and for Your sake I fight.'`,
            transliteration: `'Allaahumma 'Anta 'adhudee, wa 'Anta naseeree, bika 'ajoolu, wa bika 'asoolu, wa bika 'uqaatilu.'`,
            arabicVerse: `'اللَّهُمَّ أَنْتَ عَضُدي، وَأَنْتَ نَصِيرِي، بِكَ أَحُولُ وَبِكَ أَصُولُ وَبِكَ أُقَاتِلُ'`,
            reference: `'[Hisnul 127] [Abu Dawud 3/42, At-Tirmizi 5/572.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/127hm.mp3',
          },

          {
            duaId: 3,
            englishTranslation: `'Allah is sufficient for us and the best of those on whom to depend.'`,
            transliteration: `'Hasbunallaahu wa ni'amal-wakeel.'`,
            arabicVerse: `'حَسْبُنَا اللَّهُ وَنِعْمَ الوَكِيلُ'`,
            reference: `'[Hisnul 128] [Al-Bukhari, 5/172.]'`,
            url: 'httpshttps://admin.gomasjid.co.uk/assets/dua/128hm.mp3',
          },
        ],
      },

      {
        title: 'Invocation against the oppression of rulers',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, Lord of the Seven heavens, Lord of the Magnificent Throne, be for me a support against (say the person's name) and his helpers from among your creatures, lest any of them abuse me or do me wrong. Mighty is Your patronage and glorious are Your praises. There is none worthy of worship but You.'`,
            transliteration: `'Allaahumma Rabbas-samaawaatis-sab'i, wa Rabbal-'Arshil-'Adheem, kun lee jaaran min (name of the person), wa 'ahzaabihi min khalaa'iqika, 'an yafruta 'alayya 'ahadun minhum 'aw yatghaa, 'azzajaaruka, wajalla thanaa'uka, wa laa 'ilaaha 'illaa 'Anta.'`,
            arabicVerse: `'اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ، وَرَبَّ الْعَرْشِ الْعَظِيمِ، كُنْ لِي جَاراً مِنْ (اِسمُه) وَأَحْزَابِهِ مِنْ خَلاَئِقِكَ، أَن يَفْرُطَ عَلَيَّ أَحَدٌ مِنْهُمْ أَوْ يَطْغَى، عَزَّ جَارُكَ وَجَلَّ ثَنَائُكَ، وَلَا إِلَهَ إِلَّا أَنْتَ'`,
            reference: `'[Hisnul 129] [Al-Bukhari[Al-Adab Al-Mufrad][707] and Al-Albânî authenticated it in Ŝaĥîĥ Al-Adab Al-Mufrad [545].]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/129hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'Allah is the Most Great, Mightier than all His creation. He is Mightier than what I fear and dread. I seek refuge in Allah, Who there is none worthy of worship but Him. He is the One Who holds the Seven heavens from falling upon the earth except by His command. (I seek refuge in You Allah) from the evil of Your slave (say the person's name), and his helpers, his followers and his supporters from among the jinn and mankind. O Allah, be my support against their evil. Glorious are Your praises and mighty is Your patronage. Blessed is Your Name, there is no true God but You. (Three times)'`,
            transliteration: `'Allahu 'Akbar, Allahu 'a'azzu min khalqihi jamee'an, Allaahu 'a'azzu mimmaa 'akhaafu wa 'ahtharu, 'a'oothu billaahil-lathee laa 'ilaaha 'illaa Huwa, almumsikis-samaawaatis-sab'i 'an yaqa'na 'alal-'ardhi 'illaa. bi'ithnihi, min sham 'abdika (name of the person), wa junoodihi wa 'atbaa'ihi wa 'ashyaa'ihi, minal-jinni wal'insi, Allaahumma kun lee jaaran min sharrihim, jalla thanaa'uka wa 'azza jaaruka, wa tabaarakasmuka, wa laa 'ilaaha ghayruka.'`,
            arabicVerse: `'اللَّهُ أَكْبَرُ، اللَّهُ أَعَزُّ مِنْ خَلْقِهِ جَمِيعًا، اللَّهُ أَعَزُّ مِمَّا أَخَافُ وَ أَحْذَرُ، أَعُوذُ بِاللَّهِ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ، الْمُمْسِكِ السَّمَاوَاتِ السَّبْعِ أَنْ يَقَعْنَ عَلَى الأَرْضَ إِلاَّ بِإِذْنِهِ، مِنْ شَرِّ عَبْدِكَ (اِسمُه)، وَجُنُودِهِ وَأَتْبَاعِهِ وَأَشْيَاعِهِ، مِنَ الْجِنِّ وَالإِنْسِ، اللَّهُمَّ كُنُ لِي جَارًا مِنْ شَرِّهِمْ، جَلَّ ثَنَاؤُكَ وَعَزَّ جَارُكَ، وَتَبَارَكَ اسْمُكَ، وَلاَ إِلَهَ غَيْرُكَ'`,
            reference: `'[Hisnul 130] [Al-Bukhari[Al-Adab Al-Mufrad][708] and Al-Albânî authenticated it in Ŝaĥîĥ Al-Adab Al-Mufrad (546).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/130hm.mp3',
          },
        ],
      },

      {
        title: 'Against enemies',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Allah, Revealer of the Book, Swift to account, defeat the groups (of disbelievers). O Allah, defeat them and shake them.'`,
            transliteration: `'Allaahumma munzilal-kitaabi, saree'al-hisaabi, ihzimil-'ahzaaba, Allaahumma ihzimhum wa zalzilhum.'`,
            arabicVerse: `'اللَّهُمَّ مُنْزِلَ الْكِتَابِ، سَرِيعَ الْحِسَابِ، اهْزِمِ الأَحْزَابَ، اللَّهُمَّ اهْزِ مْهُمْ وَزَلْزِلْهُمْ'`,
            reference: `'[Hisnul 131] [Muslim 3/1362.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/131hm.mp3',
          },
        ],
      },

      {
        title: 'When being afraid of a group of people',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, suffice me against them however You wish.'`,
            transliteration: `'Allaahummak-fineehim bimaa shi'ta.'`,
            arabicVerse: `'اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ'`,
            reference: `'[Hisnul 132] [Muslim 4/2300.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/132hm.mp3',
          },
        ],
      },

      {
        title: 'For one afflicted with doubt in his faith',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I seek refuge in Allah from satan the outcast (then you should desist from doing what you are in doubt about).'`,
            transliteration: `''A 'oothu billaahi minash-Shaytaanir-rajeem.'`,
            arabicVerse: `'أَعُوذُ بِاللَّهِ مِنَ الشَّيْـطَانِ الرَّجِيـمِ'`,
            reference: `'[Hisnul 133] [Al-Bukhari, Muslim 1/120.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/138hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'I believe in Allah and His Messenger.'`,
            transliteration: `''Aamantu billaahi wa Rusulihi.'`,
            arabicVerse: `'آمَنْـتُ بِاللَّهِ وَرُسُـلِهِ'`,
            reference: `'[Hisnul 134] [Muslim, 1/119-20.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/134hm.mp3',
          },

          {
            duaId: 3,
            englishTranslation: `'He is the First and the Last, the Most High and the Most Near. And He is the Knower of all things'`,
            transliteration: `'Huwal-'Awwalu wal-'Aakhiru wadh-Dhaahiru wal-Baatinu, wa Huwa bikulli shay'in 'Aleem.'`,
            arabicVerse: `'هُوَ الأَوَّلُ وَالآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ وَهُوَ بِكُلِّ شَيءٍ عَلِيمٌ'`,
            reference: `'[Hisnul 135] [Al-Hadid 57:3, Abu Dawud 4/329.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/135hm.mp3',
          },
        ],
      },

      {
        title: 'Settling a debt',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.'`,
            transliteration: `'Allaahummak-finee bihalaalika 'an haraamika wa 'aghninee bifadhlika 'amman siwaaka.'`,
            arabicVerse: `'اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكِ عَمَّنْ سِوَاكَ'`,
            reference: `'[Hisnul 136] [At-Tirmizi 5/560.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/136hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah, I seek refuge in You from grief and sadness, from weakness and from laziness, from miserliness and from cowardice, from being overcome by debt and from being overpowered by men'`,
            transliteration: `'Allaahumma 'innee 'a'oothu bika minal-hammi walhazani, wal'ajzi walkasali, walbukhli waljubni, wa dhala'id-dayni wa ghalabatir-rijaali.'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي أَعْوذُ بِكَ مِنَ الهَمِّ وَالْحَزَنِ، والعَجْزِ والكَسَلِ، والبُخْلِ والجُبْنِ، وضَلْعِ الدَّيْنِ وغَلَبَةِ الرِّجَالِ'`,
            reference: `'Al-Bukhârî [6363](7/158).'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/137hm.mp3',
          },
        ],
      },

      {
        title: 'For one afflicted by a calamity',
        data: [
          {
            duaId: 1,
            englishTranslation: `'We are from Allah and unto Him we return. O Allah take me out of my plight and bring to me after it something better.'`,
            transliteration: `''Innaa lillaahi wa 'innaa 'ilayhi raaji'oon, Allaahumma'-jurni fee museebatee wa 'akhliflee khayran minhaa.'`,
            arabicVerse: `'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي، وَأَخْلِفْ لِي خَيْراً مِنْهَا'`,
            reference: `'[Hisnul 154] [Muslim 2/632.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/154hm.mp3',
          },
        ],
      },

      {
        title: 'For fear of shirk',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, I seek refuge in You lest I associate anything with You knowingly, and I seek Your forgiveness for what I know not.'`,
            transliteration: `'Allaahumma 'innee 'a'oothu bika 'an 'ushrika bika wa 'anaa 'a'lamu, wa 'astaghfiruka limaa laa 'a'lamu.'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي أَعُوذُبِكَ أَنْ أُشْرِكَ بِكَ وَأَنا أَعْلَمْ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ'`,
            reference: `'[Hisnul 203] [Ahmad 4/403.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/203hm.mp3',
          },
        ],
      },

      {
        title: 'Forbiddance of ascribing things to omens',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah there is no portent other than Your portent, no goodness other than Your goodness, and none worthy of worship other than You.'`,
            transliteration: `'Allaahumma laa tayra 'illaa tayruka, wa laa khayra 'illaa khayruka, wa laa 'ilaaha ghayruka.'`,
            arabicVerse: `'اللَّهُمَّ لَا طَيْرَ إِلَاَّ طَيْرُكَ، وَلَا خَيْرَ إِلَاَّ خَيْرُكَ، وَلَا إِلَهَ غَيْرُكَ'`,
            reference: `'[Hisnul 205] [Ahmad 2/220, Ibn As-Sunni (Hadith no. 292).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/205hm.mp3',
          },
        ],
      },

      {
        title: 'What to say upon receiving pleasing or displeasing news',
        data: [
          {
            duaId: 1,
            englishTranslation: `'When something happened that pleased him say: "Praise is to Allah Who by His blessings all good things are perfected".(1)And if something happened that displeased him say: "Praise is to Allah in all circumstances".(2)'`,
            transliteration: `'Alhamdu lillaahil-lathee bini'matihi tatimmus-saalihaat.(1)Alhamdu lillaahi 'alaa kulli haal.(2)'`,
            arabicVerse: `'(1)الْحَمْدُ للَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ(2)الْحَمْدُ للَّهِ عَلَى كُلِّ حَالٍ'`,
            reference: `'[Hisnul 218] [Ibn As-Sunni, Sahih al-Jami' as-Saghir 4/201.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/218hm.mp3',
          },
        ],
      },

      {
        title: 'At times of amazement and delight',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Glory is to Allah.'`,
            transliteration: `'Subhaanallaah.'`,
            arabicVerse: `'سُبْحَانَاللَّهِ'`,
            reference: `'[Hisnul 240] [Al-Bukhari, Muslim 4/1857.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/240hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'Allah is the Most Great.'`,
            transliteration: `'Allaahu 'Akbar.'`,
            arabicVerse: `'اللَّهُ أَكْبَرُ'`,
            reference: `'[Hisnul 241] [Al-Bukhari, Ahmad 5/218.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/241hm.mp3',
          },
        ],
      },

      {
        title: 'Upon receiving pleasant news',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Whenever something happened that pleased him or made him happy, the Prophet would prostrate himself in gratitude to Allah, the Blessed, the All-Mighty.'`,
            transliteration: `''`,
            arabicVerse:
              'كَانَ النَّبِيُّ ﷺ إذَا أتَاهُ أَمْرٌ يَسُرُّهُ أَوْ يُسَرُّ بِهِ؛ خَرَّ سَاجِداً شُكْراً لله تَبَارَكَ وَ تَعَالَى',
            reference: `'[Hisnul 242] [Abu Dawud, Ibn Majah, At-Tirmizi.]'`,
            url: '',
          },
        ],
      },

      {
        title: 'When startled',
        data: [
          {
            duaId: 1,
            englishTranslation: `'There is none worthy of worship but Allah.'`,
            transliteration: `'Laa 'ilaaha 'illallaah.'`,
            arabicVerse: `'لَا إِلهَ إِلاَّ اللَّهُ'`,
            reference: `'[Hisnul 245] [Al-Bukhari, Muslim 4/2208.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/245hm.mp3',
          },
        ],
      },
    ],
  },

  {
    categoryId: 5,
    categoryName: 'Sick & Death',
    data: [
      {
        title: `'Placing children under Allah's protection'`,
        data: [
          {
            duaId: 1,
            englishTranslation: `'I seek protection for you in the Perfect Words of Allah from every devil and every beast, and from every envious blameworthy eye.'`,
            transliteration: `''U'eethukumaa bikalimaatil-laahit-taammati min kulli shaytaanin wa haammatin, wa min kulli 'aynin laammatin.'`,
            arabicVerse: `'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ'`,
            reference: `'[Hisnul 146] [Al-Bukhari 4/119.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/146hm.mp3',
          },
        ],
      },

      {
        title: 'When visiting the sick',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Do not worry, it will be a purification (for you), Allah willing.'`,
            transliteration: `'Laa ba'sa tahoorun 'inshaa'Allaah.'`,
            arabicVerse: `'لاَ بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ'`,
            reference: `'[Hisnul 147] [Al-Bukhari.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/147hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'I ask Almighty Allah, Lord of the Magnificent Throne, to make you well. (Seven times)'`,
            transliteration: `''As'alullaahal-'Adheema Rabbal-'Arshil-'Adheemi 'an yashfiyaka.'`,
            arabicVerse: `'أَسْأَلُ اللَّهَ الْعَظِيمَ، رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ'`,
            reference: `'[Hisnul 148] [At-Tirmizi, Abu Dawud.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/148hm.mp3',
          },
        ],
      },

      {
        title: 'Excellence of visiting the sick',
        data: [
          {
            duaId: 1,
            englishTranslation: `'When a man goes to visit his sick Muslim brother, he walks along a path of Paradise until he sits, and when he sits he is cloaked in mercy. If he comes in the morning, Seventy thousand angels pray for him until evening, and if he comes in the evening, Seventy thousand angels pray for him until morning.'`,
            transliteration: `''`,
            arabicVerse:
              'إذَا عَادَ الرَّجُلُ أخَاهُ المُسْلِمَ، مَشَى فِي خِرَافَةِ الجَنَّةِ حَتَّى يَجْلِسَ، فَإذَا جَلَسَ غَمَرَتْهُ الرَّحْمَةُ،  فَإنْ كَانَ غُدْوَةً صَلَّى عَلَيْهِ سَبْعُونَ ألْفَ مَلَكٍ حَتَّى يُمْسِيَ، و إنْ كَانَ مَسَاءً صَلَّى عَلَيْهِ سَبْعُونَ ألْفَ مَلَكٍ حَتَّى يُصْبِحَ',
            reference: `'[Hisnul 149] [At-Tirmidhî [969], Ibn Mâjah [1442] and Aĥmad (1/97). Also see Ŝaĥîĥ Ibn Mâjah (1/244) and Ŝaĥîĥ At-Tirmidhî (1/286). Shaykh Aĥmad Shâkir also authenticated it.]'`,
            url: '',
          },
        ],
      },

      {
        title: 'When the sick have renounced all hope of life',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, forgive me and have mercy upon me and join me with the highest companions (in Paradise).'`,
            transliteration: `'Allaahum-maghfir lee warhamnee wa 'alhiqnee bir-rafeeqil-'a'laa.'`,
            arabicVerse: `'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَأَلْحِقْنِي بِالرَّفِيقِ الأَعْلَى'`,
            reference: `'[Hisnul 150] [Al-Bukhari7/10, Muslim 4/1893.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/150hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'There is none worthy of worship but Allah, surely death has agonies.'`,
            transliteration: `'Laa 'ilaaha 'illallaahu 'inna lilmawti lasakaraatin.'`,
            arabicVerse: `'لَا إِلَهَ إِلَّا اللَّه إِنَّ لِلمَوْتِ لَسَكَرَاتٍ'`,
            reference: `'[Hisnul 151] [Al-Bukhari[4449](8/144).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/151hm.mp3',
          },

          {
            duaId: 3,
            englishTranslation: `'There is none worthy of worship but Allah, Allah is the Most Great. None has the right to be worshiped but Allah alone. None has the right to be worshiped but Allah alone, Who has no partner. There is none worthy of worship but Allah, His is the dominion and His is the praise. There is none worthy of worship but Allah, there is no power and no might but by Allah.'`,
            transliteration: `'Laa 'ilaaha 'illallaahu wallaahu 'Akbar, laa 'ilaaha 'illallaahu wahdahu, laa 'ilaaha 'illallaahu wahdahu laa shareeka lahu, laa 'ilaaha 'illallaahu lahul-mulku wa lahul-hamdu, laa 'ilaaha 'illallaahu wa laa hawla wa laa quwwata 'illaa billaah.'`,
            arabicVerse: `'لَا إِلَهَ إلاَّ اللَّهُ وَاللَّهُ أَكْبَرُ، لَا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ، لَا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لَا شَرِيكَ لهُ، لَا إِلَهَ إِلاَّ اللَّهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، لَا إِلَهَ إِلاَّ اللَّهُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَاَّ بِاللَّهِ'`,
            reference: `'[Hisnul 152] [At-Tirmidhî [3430] and Ibn Mâjah [3794]. Al-Albânî authenticated it. Also see Ŝaĥîĥ At-Tirmidhî (3/152) and Ŝaĥîĥ Ibn Mâjah (2/317).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/152hm.mp3',
          },
        ],
      },

      {
        title: 'Instruction for the one nearing death',
        data: [
          {
            duaId: 1,
            englishTranslation: `'There is none worthy of worship but Allah.'`,
            transliteration: `'Laa 'ilaaha 'illallaahu.'`,
            arabicVerse: `'لَا إِلَهَ إِلاَّ اللَّهُ'`,
            reference: `'[Hisnul 153] [Abu Dawud 3/190.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/153hm.mp3',
          },
        ],
      },

      {
        title: 'For one afflicted by a calamity',
        data: [
          {
            duaId: 1,
            englishTranslation: `'We are from Allah and unto Him we return. O Allah take me out of my plight and bring to me after it something better.'`,
            transliteration: `''Innaa lillaahi wa 'innaa 'ilayhi raaji'oon, Allaahumma'-jurni fee museebatee wa 'akhliflee khayran minhaa.'`,
            arabicVerse: `'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي، وَأَخْلِفْ لِي خَيْراً مِنْهَا'`,
            reference: `'[Hisnul 154] [Muslim 2/632.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/154hm.mp3',
          },
        ],
      },

      {
        title: 'When closing the eyes of the deceased',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, forgive (say the person's name) and elevate his station among those who are guided. Send him along the path of those who came before, and forgive us and him, O Lord of the worlds. Enlarge for him his grave and shed light upon him in it.'`,
            transliteration: `'Allaahummaghfir li-fulanin (name of the person) warfa' darajatahu fil-mahdiyyeena, wakhlufhu fee 'aqibihi fil-ghaabireena , waghfir-lanaa wa lahu yaa Rabbal-'aalameena, wafsah lahu fee qabrihi wa nawwir lahu feehi.'`,
            arabicVerse: `'اللَّهُمَّ اغْفِرْ لِفلَانٍ (باسمه) وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ، وَاغْفِرْ لَنَا وَلَهُ يَارَبَّ الْعَالَمِينَ، وَافْسَحْ لَهُ فِي قَبْرِهِ وَنَوِّرْ لَهُ فِيهِ'`,
            reference: `'[Hisnul 155] [Muslim 2/634.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/155hm.mp3',
          },
        ],
      },

      {
        title: 'For the deceased at the funeral prayer',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, forgive him and have mercy on him and give him strength and pardon him. Be generous to him and cause his entrance to be wide and wash him with water and snow and hail. Cleanse him of his transgressions as white cloth is cleansed of stains. Give him an abode better than his home, and a family better than his family and a wife better than his wife. Take him into Paradise and protect him from the punishment of the grave (and from the punishment of Hell-fire).'`,
            transliteration: `'Allaahum-maghfir lahu warhamhu, wa 'aafihi, wa'fu 'anhu, wa 'akrim nuzulahu, wa wassi' mudkhalahu, waghsilhu bilmaa'i waththalji walbaradi, wa naqqihi minal-khataayaa kamaa naqqaytath-thawbal-'abyadha minad-danasi, wa 'abdilhu daaran khayran min daarihi, wa 'ahlan khayran min 'ahlihi, wa zawjan khayran min zawjihi, wa 'adkhilhul-jannata, wa. 'a'ithhu min 'athaabil-qabri wa 'athaabin-naar.'`,
            arabicVerse: `'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ، وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدْ، وَنَقِّهِ مِنَ الْخَطَايَا كَما نَقَّيْتَ الثَّوْبُ الأَبْيَضَ مِنَ الدَّنَسِ، وَأَبْدِلْهُ دَاراً خَيْراً مِنْ دَارِهِ، وَأَهْلاً خَيْراً مِنْ أَهْلِهِ، وَزَوْجاً خَيْراً مِنْ زَوْجِهِ، وَأَدْخِلْهُ الْجَنَّةَ، وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ وَعَذَابِ النَّارِ'`,
            reference: `'[Hisnul 156] [Muslim 2/663.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/156hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah forgive our living and our dead, those who are with us and those who are absent, our young and our old, our menfolk and our womenfolk. O Allah, whomever you give life from among us give him life in Islam, and whomever you take way from us take him away in Faith. O Allah, do not forbid us their reward and do not send us astray after them.'`,
            transliteration: `'Allaahum-maghfir lihayyinaa, wa mayyitinaa, wa shaahidinaa, wa ghaa'ibinaa, wa sagheerinaa wa kabeerinaa, wa thakarinaa wa 'unthaanaa. Allaahumma man 'ahyaytahu minnaa fa'ahyihi 'alal-'Islaami, wa man tawaffaytahu minnaa fatawaffahu 'alal-'eemaani, Allaahumma laa tahrimnaa 'ajrahu wa laa tudhillanaa ba'dahu.'`,
            arabicVerse: `'اللَّهُمَّ اغْفِرَّْ لِحَيِّنَا، وَمَيِّتِنَا، وَشَاهِدِنَا، وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا. اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الإِسْلَامِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الإِيمَانِ، اللَّهُمَّ لاَ تَحْرِمْنَا أَجْرَهُ، وَلَا تُضِلَّنَا بَعْدَهُ'`,
            reference: `'[Hisnul 157] [Ibn Majah 1/480, Ahmad 2/368.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/157hm.mp3',
          },
          {
            duaId: 3,
            englishTranslation: `'O Allah, surely (say the person's name) is under Your protection, and in the rope of Your security, so save him from the trial of the grave and from the punishment of the Fire. You fulfill promises and grant rights, so forgive him and have mercy on him. Surely You are Most Forgiving, Most Merciful.'`,
            transliteration: `'Allaahumma 'inna (name the person) fee thimmatika, wa habli jiwaarika, faqihi min fitnatil-qabri wa 'athaabin-naari, wa 'Anta 'ahlul-wafaa'i walhaqqi. Faghfir lahu warhaw.hu 'innaka 'Antal-Ghafoorur-Raheem.'`,
            arabicVerse: `'اللَّهُمَّ إِنَّ (باسمه) في ذِمَّتِكَ، وَحَبْلِ جِوَارِكَ، فَقِهِ مِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ النَّار، وَأَنْتَ أَهْلُ الْوَفَاءِ وَالْحَقِّ، فَاغْفِرْْ لَهُ وَارْحَمْهُ، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ'`,
            reference: `'[Hisnul 158] [Ibn Majah, Abu Dawud 3/211.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/158hm.mp3',
          },
          {
            duaId: 4,
            englishTranslation: `'O Allah, Your male slave and the child of Your female slave is in need of Your mercy, and You are not in need of his torment. If he was pious then increase his rewards and if he was a transgressor then pardon him.'`,
            transliteration: `'Allaahumma 'abduka wabnu 'amatika ihtaaja 'ilaa rahmatika, wa 'Anta ghaniyyun 'an 'athaabihi, 'in kaana muhsinan fazid fee hasanaatihi, wa 'in kaana musee'an fatajaawaz 'anhu.'`,
            arabicVerse: `'اللَّهُمَّ عَبْدُكَ وَابْنُ أَمَتِكَ احْتَاجَ إِلَى رَحْمَتِكَ، وَأَنْتَ غَنِيٌّ عَنْ عَذَابِهِ، إِنْ كَانَ مُحْسِناً فَزِدْ فِي حَسَنَاتِهِ، وَإِنْ كَانَ مُسِيئاً فَتَجَاوَزْ عَنْهُ'`,
            reference: `'[Hisnul 159] [Al-Hakim 1/359.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/159hm.mp3',
          },
        ],
      },

      {
        title: 'For the deceased is a child, during the funeral prayer',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, protect him from the torment of the grave.(1)O Allah, make him a precursor, a forerunner and a treasure for his parents and an answered intercessor. O Allah, make him weigh heavily in their scales (of good) and magnify their reward. Make him join the righteous of the believers. Place him in the care of Ibrahim. Save him by Your mercy from the torment of Hell. Give him a home better than his home and a family better than his family. O Allah, forgive those who have gone before us, our children lost (by death), and those who have preceded us in Faith.(2)'`,
            transliteration: `'Allaahumma 'a'ith-hu min 'athaabil-qabri.(1)Allaahum-maj'alhufaratan wa thukhran liwaalidayhi, wa shafee'an mujaaban. Allaahumma thaqqil bihi mawaazeenahumaa wa 'a'dhim bihi 'ujoorahumaa, wa 'alhiqhu bisaalihil-mu'mineena, waj'alhu fee kafaalati 'Ibraaheema, wa qihi birahmatika 'athaabal-jaheemi, wa 'abdilhu daaran khayran min daarihi, wa 'ahlan khayran min 'ahlihi, Allaahum-maghfir li'aslaafinaa, wa 'afraatinaa wa man sabaqanaa bil'eemaan.(2)'`,
            arabicVerse: `'(1)اللَّهُمَّ أَعِذْهُ مِنْ عَذَابِ الْقَبْرِ(2)اللَّهُمَّ اجْعَلْهُ فَرَطاً وَذُخْراً لِوالِدَيه، وَشَفيعاً مُجاباً، اللَّهُمَّ ثَقِّلْ بِهِ مَوَازينَهُمَا، وَأَعْظِمْ بِهِ أُجُورَهُمَا، وَأَلْحِقْهُ بِصَالِحِ المُؤْمِنِينَ، وَاجْعَلْهُ فِي كَفَالَةِ إِبْرَاهِيمَ، وَقِهِ بِرَحْمَتِكَ عَذَابَ الْجَحِيمِ، وَأَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ، وَأَهْلًا خَيْرًا مِنْ أَهْلِهِ، اللَّهُمَّ اغْفِرْ ﻷَسْلاَفِنَا، وَأَفْرَاطِنَا، وَمَنْ سَبَقَنَا بِالاءِيْمَانِ'`,
            reference: `'See Al-Mughnî by Ibn Qudâmah (3/416) and Ad-Durûs  Al-Muhimmah Li'âmah Al-Ummah by Shaykh Ibn Bâz (pg. 15).'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/160hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah, make him for us a precursor, a forerunner and a cause of reward.'`,
            transliteration: `'Allaahum-maj'alhu lanaa faratan, wa salafan, wa 'ajran.'`,
            arabicVerse: `'اللَّهُمَّ اجْعَلْهُ لَنا فَرَطاً، وَسَلَفاً، وَأَجْراً'`,
            reference: `'[Hisnul 161] [Al-Bukhari Kitabul-Jana'iz, 2/113]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/161hm.mp3',
          },
        ],
      },

      {
        title: 'Condolence',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Surely, Allah takes what is His, and what He gives is His, and to all things He has appointed a time. So have patience and be rewarded.(1)May Allah magnify your reward, and make perfect your bereavement, and forgive your departed.(2)'`,
            transliteration: `''Inna lillaahi maa 'akhatha, wa lahu maa 'a'taa, wa kullu shay'in 'indahu bi'ajalin musamman . . . faltasbir waltahtasib.(1)'A'dhamallaahu 'ajraka, wa 'ahsana 'azaa'aka wa ghafara limayyitika.(2)'`,
            arabicVerse: `'(1)إِنَّ لِلَّهِ مَا أَخَذَ، وَلَهُ مَا أَعْطَى وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمَّى... فَلْتَصْبِرْ وَلْتَحْتَسِبْ(2)أَعْظَمَ اللَّهُ أَجْرَكَ، وَأَحْسَنَ عَزَاءَ ك وَغَفَرَ لِمَيِّتِكَ'`,
            reference: `'[Hisnul 162] [Al-Bukhari 2/80, Muslim 2/636.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/162hm.mp3',
          },
        ],
      },

      {
        title: 'Placing the deceased in the grave',
        data: [
          {
            duaId: 1,
            englishTranslation: `'With the Name of Allah and according to the Sunnah of the Messenger of Allah.'`,
            transliteration: `'Bismillaahi wa 'alaa sunnati Rasoolillaahi.'`,
            arabicVerse: `'بِسْمِ اللَّهِ وَعَلَى سُنَّةِ رَسُولِ اللَّهِ'`,
            reference: `'[Hisnul 163] [Abu Dawud 3/314 with an authentic chain, Ahmad.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/163hm.mp3',
          },
        ],
      },

      {
        title: 'After burying the deceased',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, forgive him. O Allah, strengthen him.(The Prophet saw used to stop after burying the dead and say to the people: "Ask Allah to forgive your brother and pray for him to be strengthened, for indeed he is now being questioned".)'`,
            transliteration: `'Allaahum-maghfir lahu Allaahumma thabbithu.'`,
            arabicVerse: `'اللَّهُمَّ اغْفِرْ لَهُ، اللَّهُمَّ ثَبِّتْهُ'`,
            reference: `'[Hisnul 164] [Abu Dawud 3/315, Al-Hakim 1/370.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/164hm.mp3',
          },
        ],
      },

      {
        title: 'Visiting the graves',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Peace be upon you, people of this abode, from among the believers and those who are Muslims, and we, by the Will of Allah, shall be joining you. May Allah have mercy on the first of us and the last of us) I ask Allah to grant us and you strength.'`,
            transliteration: `'Assalaamu 'alaykum 'ahlad-diyaari, minal-mu'mineena walmuslimeena, wa 'innaa 'in shaa' Allaahu bikum laahiqoona [wa yarhamullaahul-mustaqdimeena minnaa walmusta'khireena] 'as'alullaaha lanaa wa lakumul- 'aafiyata.'`,
            arabicVerse: `'السَّلاَمُ عَلَيْكُمْ أَهْلَ الدِّيَّارِ، مِنْ الْمُؤْمِنِينَ وَالْمُسْلِمِيَن، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، وَيَرْحَمُ اللَّهُ الْمُسْتَقْدِمِينَ مِنَّا وَالْمُسْتَأْخِرِينَ أَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ'`,
            reference: `'[Hisnul 165] [Muslim 2/671, Ibn Majah 1/494, Muslim 2/671.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/165hm.mp3',
          },
        ],
      },

      {
        title: 'When feeling some pain in the body',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Put your hand on the place where you feel pain and say: "With the Name of Allah". (Three times)(1)Then say: "I seek refuge in Allah and in His Power from the evil of what I find and of what I guard against". (Seven times)(2)'`,
            transliteration: `'Bismillaah.(1)'A'oothu billaahi wa qudratihi min sharri maa 'ajidu wa 'uhaathiru.(2)'`,
            arabicVerse:
              'بِسْمِ اللهِ (ثَلاثاً)\nأَعُوذُ بِاللهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ.(سَبْعَ مَرَّاتٍ)',
            reference: `'[Hisnul 243] [Muslim 4/1728.]'`,
            url: 'https://https://admin.gomasjid.co.uk/assets/dua/243hm.mp3',
          },
        ],
      },
    ],
  },

  {
    categoryId: 6,
    categoryName: 'Haj & Umrah',
    data: [
      {
        title: `'The Talbiya for the one doing Haj or Umrah'`,
        data: [
          {
            duaId: 1,
            englishTranslation: `'I am here at Your service, O Allah, I am here at Your service. I am here at Your service, You have no partner, I am here at Your service. Surely the praise, and blessings are Yours, and the dominion. You have no partner.'`,
            transliteration: `'Labbayk Allaahumma labbayk, labbayk laa shareeka laka labbayk, 'innal-hamda, wanni'mata, laka walmulk, laa shareeka laka.'`,
            arabicVerse: `'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ والنِّعْمَةَ، لَكَ والْمُلْكُ، لَا شَرِيكَ لَكَ'`,
            reference: `'[Hisnul 233] [Al-Bukhari, Muslim 2/841.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/233hm.mp3',
          },
        ],
      },

      {
        title: 'The Takbeer passing the black stone',
        data: [
          {
            duaId: 1,
            englishTranslation: `'The Prophet (SAW) performed Tawaf riding a camel. Every time he passed the corner (containing the Black Stone), he would point to it with something that he was holding and say: Allaahu 'Akbar. (Allah is the Most Great)(The 'something' that was referred to in this Hadith was a cane.)'`,
            transliteration: `'Allaahu 'Akbar.'`,
            arabicVerse: `'اللَّهُ أَكْبَرُ'`,
            reference: `'[Hisnul 234] [Al-Bukhari[1612](1/476).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/234hm.mp3',
          },
        ],
      },

      {
        title: 'Between the Yemeni corner and the black stone',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Our Lord, grant us the good things in this world and the good things in the next life and save us from the punishment of the Fire.'`,
            transliteration: `'Rabbanaa 'aatinaa fid-dunyaa hasanatan wa fil-'aakhirati hasanatan wa qinaa 'athaaban-naar.'`,
            arabicVerse: `'رَبَّنَا آتِنَا فِي الْدُّنْيَا حَسَنَةً وَفِي الَأخِرَةِ حَسَنةً وَقِنَا عَذَابَ النَّارِ'`,
            reference: `'[Hisnul 235] [Abu Dawud 2/179, Ahmad 3/411, Al-Baghawi Surah Al-Baqarah:201.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/235hm.mp3',
          },
        ],
      },

      {
        title: 'When at Mount Safa and Mount Marwah',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Whenever the Prophet (SAW) approached Mount Safa, he would recite: "Surely Safa and Marwah are among the signs of Allah. I begin by that which Allah began".(1) Then he began (his Sa'y) at Mount Safa climbing it until he could see the House (Kaaba). He then faced the Qiblah repeating the words: "Allah is the Most Great, Allah is the Most Great, Allah is the Most Great".(2) Then he said: "None has the right to be worshiped but Allah alone, Who has no partner, His is the dominion and His is the praise, and He is Able to do all things. None has the right to be worshiped but Allah alone, He fulfilled His Promise, He aided His slave, and He alone defeated Confederates".(3) Then he would ask Allah for what he liked, repeating the same thing like this Three times. He did at Mount Marwah as he did at Mount Safa.'`,
            transliteration: `''Innas-Safaa wal-Marwata min sha'aa'irillaah. 'Abda'u bimaa bada'allaahu bihi.(1)Allaahu 'Akbar.(2)Laa 'ilaaha 'illallaahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu wa Huwa 'alaa kulli shay'in Qadeer, laa 'ilaaha 'illallaahu ilahaahu, 'anjaza wa'dahu, wa nasara 'abdahu, wa hazamal 'ahzaaba wahdahu.(3)'`,
            arabicVerse: `'(1)إِنَّ الصَّفَا وَالمَرْوَةَ مِنْ شَعَائِرِاللَّهِ. أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ(2) اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ(3) لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الأَحْزَابَ وَحْدَهُ'`,
            reference: `'[Hisnul 236] [Muslim 2/888.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/236hm.mp3',
          },
        ],
      },

      {
        title: `'The Day of 'Arafah'`,
        data: [
          {
            duaId: 1,
            englishTranslation: `'The best invocation is that of the Day of Arafat, and the best that anyone can say is what I and the Prophets before me have said: "None has the right to be worshiped but Allah alone, Who has no partner. His is the dominion and His is the praise, and He is Able to do all things".'`,
            transliteration: `'Laa 'ilaaha 'illallaahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu wa Huwa 'alaa kulli shay'in Qadeer.'`,
            arabicVerse: `'لاَ إِلَهَ إِلاَّ اللّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ'`,
            reference: `'[Hisnul 237] [At-Tirmizi[3585]. Al-Albânî authenticated it in Ŝaĥîĥ At-Tirmidhî (3/184) and Al-Aĥâdîth Aŝ-Ŝaĥîĥah (4/6).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/237hm.mp3',
          },
        ],
      },

      {
        title: 'Remembrance at Muzdalifa',
        data: [
          {
            duaId: 1,
            englishTranslation: `'The Prophet (SAW) rode his camel, Al-Qaswa' (from Arafah), until he reached the sacred area (Al-Mash'aril-Haraam). Then he faced the Qiblah and invoked Allah, and repeatedly said:"Allah is the Most Great",(1)"There is none worthy of worship but Allah"(2) and"Allah is One".(3)He remained stationary until the sky became yellow with the dawn, and then pressed on before sunrise.'`,
            transliteration: `'Allaahu 'Akbar.(1)Laa 'ilaaha 'illallaah.(2)Allaahu 'Ahad.(3)'`,
            arabicVerse: `'(1)اللَّهُ أَكْبَرُ(2)لاَ إِلَهَ إِلاَّ اللَّهُ(3)اللَّهُ اَحَدٌ'`,
            reference: `'[Hisnul 238] [Muslim 2/891.]'`,
            url: '',
          },
        ],
      },

      {
        title: 'When throwing each pebble at the Jamarat',
        data: [
          {
            duaId: 1,
            englishTranslation: `'The Prophet (SAW) said Allaahu 'Akbar (Allah is the Most Great) with each pebble he threw at the Three pillars. Then he went forward, stood facing the Qiblah and raised his hands and called upon Allah. That was after (stoning) the first and second pillar. As for the third, he stoned it and called out Allaahu 'Akbar with every pebble he threw, but when he was finished he left without standing at it (for supplications).'`,
            transliteration: `'Allaahu 'Akbar.'`,
            arabicVerse: `'اللَّهُ أكْبَرُ'`,
            reference: `'[Hisnul 239] [Al-Bukhari, Muslim]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/240hm.mp3',
          },
        ],
      },

      {
        title: 'When slaughtering or offering a sacrifice',
        data: [
          {
            duaId: 1,
            englishTranslation: `'With the Name of Allah, Allah is the Most Great! (O Allah, from You and to You.) O Allah, accept it from me.'`,
            transliteration: `'Bismillaahi wallaahu 'Akbar [Allaahumma minka wa laka] Allaahumma taqabbal minnee.'`,
            arabicVerse: `'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ اللَّهُمَّ مِنْكَ ولَكَ اللَّهُمَّ تَقَبَّلْ مِنِّي'`,
            reference: `'[Hisnul 246] [Muslim 3/1557, Al-Bayhaqi 9/287.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/246hm.mp3',
          },
        ],
      },
    ],
  },

  {
    categoryId: 7,
    categoryName: 'Travel',
    data: [
      {
        title: 'When mounting an animal or any means of transport',
        data: [
          {
            duaId: 1,
            englishTranslation: `'With the Name of Allah. Praise is to Allah. Glory is to Him Who has provided this for us though we could never have had it by our efforts. Surely, unto our Lord we are returning. Praise is to Allah. Praise is to Allah. Praise is to Allah. Allah is the Most Great. Allah is the Most Great. Allah is the Most Great. Glory is to You. O Allah, I have wronged my own soul. Forgive me, for surely none forgives sins but You.'`,
            transliteration: `'Bismillaah , Alhamdu lillaah . Subhaanal-lathee sakhkhara lanaa haathaa wa maa kunnaa lahu muqrineen. Wa 'innaa 'ilaa Rabbinaa lamunqaliboon . Alhamdu lillaah, alhamdu lillaah, alhamdu lillaah, Allaahu 'Akbar, Allaahu 'Akbar, Allaahu 'Akbar, subhaanakal-laahumma 'innee dhalamtu nafsee faghfir lee, fa'innahu laa yaghfiruth-thunooba 'illaa 'Anta.'`,
            arabicVerse: `'بِسْمِ اللَّهِ وَالْحَمْدُ لِلَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَناَ هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أكْبَرُ، اللَّهُ أكْبَرُ، اللَّهُ أكْبَرُ، سُبْحَانَكَ اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي، فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلَاَّ أَنْتَ'`,
            reference: `'[Hisnul 206] [Abu Dawud 3/34, At-Tirmizi 5/501.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/206hm.mp3',
          },
        ],
      },

      {
        title: 'For travel',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Allah is the Most Great. Allah is the Most Great. Allah is the Most Great. Glory is to Him Who has provided this for us though we could never have had it by our efforts. Surely, unto our Lord we are returning. O Allah, we ask You on this our journey for goodness and piety, and for works that are pleasing to You. O Allah , lighten this journey for us and make its distance easy for us. O Allah, You are our Companion on the road and the One in Whose care we leave our family. O Allah, I seek refuge in You from this journey's hardships, and from the wicked sights in store and from finding our family and property in misfortune upon returning.(1)Upon returning recite the same and adding: "We return repentant to our Lord, worshiping our Lord, and praising our Lord".(2)'`,
            transliteration: `'Allaahu 'Akbar, Allaahu 'Akbar, Allaahu 'Akbar, Subhaanal-lathee sakhkhara lanaa haathaa wa maa kunnaa lahu muqrineen. Wa 'innaa 'ilaa Rabbinaa lamunqaliboon. Allaahumma 'innaa nas'aluka fee safarinaa haathal-birrawattaqwaa, waminal-'amalimaa tardhaa, Allaahumma hawwin 'alaynaa safaranaa haathaa watwi 'annaa bu'dahu, Allaahumma 'Antas-saahibu fis-safari, walkhaleefatu fil-'ahli, Allaahumma 'innee 'a'oothu bika min wa'thaa'is-safari, wa ka'aabanl-mandhari, wa soo'il-munqalabi fil-maaliwal'ahli.(1)'Aa'iboona, taa'iboona, 'aabidoona, Lirabbinaa haamidoon.(2)'`,
            arabicVerse: `'(1)اللَّهُ أكبَرُ، اللَّهُ أكبَرُ، اللَّهُ أكبَرُ، سُـبْحانَ الَّذِي سَخَّـرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْـرِنيِنَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّـقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُبِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمالِ وَالأَهْلِ(2) آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ'`,
            reference: `'[Hisnul 207] [Muslim 2/978.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/207hm.mp3',
          },
        ],
      },

      {
        title: 'Upon entering a town or village',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, Lord of the Seven heavens and all they overshadow, Lord of the Seven worlds and all they uphold, Lord of the devils and all they lead astray, Lord of the winds and all they scatter. I ask You for the goodness of this town and for the goodness of its people, and for the goodness it contains. I seek refuge in You from its evil, from the evil of its people and from the evil it contains.'`,
            transliteration: `'Allaahumma Rabbas-samaawaatis-sab'i wa maa 'adhlalna, wa Rabbal-'aradheenas-sab'i wa maa 'aqlalna, wa Rabbash-shayaateeni wa maa 'adhlalna, wa Rabbar-riyaahi wa maa tharayna. 'As'aluka khayra haathihil-qaryati wa khayra 'ahlihaa, wa khayra maafeehaa, wa 'a'oothu bika min sharrihaa, wa sharri 'ahlihaa, wa shard maa feehaa.'`,
            arabicVerse: `'أللًّهُمَّ رَبَّ السَّمَوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ، وَرَبَّ الأَرَاضِينَ السَّبْعِ وَما أَقْلَلْنَ، وَرَبَّ الشَّيَاطِينِ وَمَا أَضْلَلْنَ، وَرَبَّ الرِّيَاحِ وَمَا ذَرَيْنَ، أَسْأَلُكَ خَيْرَ هَذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا، وَخَيْرَ مَا فِيهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا، وَشَرِّ أَهْلِهَا، وَشَرِّ مَا فِيهَا'`,
            reference: `'[Hisnul 208] [Al-Hakim, Ibn As-Sunni (Hadith no. 524).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/208hm.mp3',
          },
        ],
      },

      {
        title: 'When entering the market',
        data: [
          {
            duaId: 1,
            englishTranslation: `'None has the right to be worshiped but Allah alone, Who has no partner. His is the dominion and His is the praise. He brings life and He causes death, and He is living and does not die. In His Hand is all good, and He is Able to do all things.'`,
            transliteration: `'Laa 'ilaaha 'illallaahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu, yuhyee wa yumeetu, wa Huwa hayyun laa yamootu, biyadihil-khayru, wa Huwa 'alaa kulli shay'in Qadeer.'`,
            arabicVerse: `'لَا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لَا شَرِيكَ لهُ، لَهُ الْمُلْكُ وَلهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ'`,
            reference: `'[Hisnul 209] [At-Tirmizi 5/291, Al-Hakim 1/538.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/209hm.mp3',
          },
        ],
      },

      {
        title: 'When the mounted animal (or mean of transport) stumbles',
        data: [
          {
            duaId: 1,
            englishTranslation: `'In the Name of Allah.'`,
            transliteration: `'Bismillaahi. Allaahumma 'innee 'a'oothu bika minal-khubthi walkhabaa'ith.'`,
            arabicVerse: `'بِسْمِ اللَّهِ'`,
            reference: `'[Hisnul 210] [Abu Dawud 4/296.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/210hm.mp3',
          },
        ],
      },

      {
        title: 'Supplication of the traveller for the resident',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I leave you in the care of Allah, as nothing is lost that is in His care.'`,
            transliteration: `'Astawdi'ukumul-laahal-lathee laa tadhee'u wadaa'i'uhu.'`,
            arabicVerse:
              'أَسْتَوْدِعُكُمُ اللَّهَ، الَّذِيْ لَا تَضِيْعُ وَدَائِعُهُ',
            reference: `'[Hisnul 211] [Ahmad 2/403, Ibn Majah 2/943.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/211hm.mp3',
          },
        ],
      },

      {
        title: 'Supplication of the resident for the traveller',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I leave your religion in the care of Allah, as well as your safety, and the last of your deeds.'`,
            transliteration: `''Astawdi'ullaaha deenaka, wa 'amaanataka, wa khawaateema 'amalika.'`,
            arabicVerse: `'أَسْتَوْدِعُ اللَّهَ دِينَكَ، وَأَمَانَتَكَ، وَخَوَاتِيمَ عَمَلِكَ'`,
            reference: `'[Hisnul 212] [Ahmad 2/7, At-Tirmizi 5/499.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/212hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'May Allah give you piety as your provision, forgive your sins, and make goodness easy for you wherever you are.'`,
            transliteration: `'Zawwadakal-laahut-taqwaa, wa ghafara thanbaka , wa yassara lakal-khayra haythu maa kunta.'`,
            arabicVerse: `'زَوَّدَكَ اللَّهُ التَّقْوَى، وَغَفَرَذَنْبَكَ، وَيَسَّرَ لَكَ الْخَيْرَ حَيْثُمَا كُنْتَ'`,
            reference: `'[Hisnul 213] [At-Tirmizi[3444]. Also see Ŝaĥîĥ At-Tirmidhî (3/155).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/213hm.mp3',
          },
        ],
      },

      {
        title: 'Remembrance while ascending or descending',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Jabir (RA), said: "Whenever we went up a hill we would say: "Allah is the Most Great".(1)and when we descended we would say: "Glory is to Allah".(2)'`,
            transliteration: `'Allaahu 'Akbar.(1)Subhaanallaah.(2)'`,
            arabicVerse: `'(1)اللَّهُ أَكْبَرُ(2)سُبْحَانَاللَّهِ'`,
            reference: `'[Hisnul 214] [Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 6/135.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/214hm.mp3',
          },
        ],
      },

      {
        title: 'Prayer of the traveller as dawn approaches',
        data: [
          {
            duaId: 1,
            englishTranslation: `'He Who listens has heard that we praise Allah for the good things He gives us. Our Lord, be with us and bestow Your favor upon us. I seek the protection of Allah from the Fire.'`,
            transliteration: `'Sami'a saami'un bihamdillaahi wa husni balaa'ihi 'alaynaa. Rabbanaa saahibnaa, wa 'afdhil 'alaynaa 'aa'ithan billaahi minan-naar.'`,
            arabicVerse: `'سَمِعَ سَامِعٌُ بِحَمْدِ اللَّهِ، وَحُسْنِ بَلَائِهِ عَلَيْنَا. رَبَّنَا صَاحِبْنَا وَأَفْضِلْ عَلَيْنَا عَائِذاً بِاللَّهِ مِنَ النَّارِ'`,
            reference: `'[Hisnul 215] [Muslim 4/2086.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/215hm.mp3',
          },
        ],
      },

      {
        title: 'Stopping or lodging somewhere',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I seek refuge in the Perfect Words of Allah from the evil of what He has created.'`,
            transliteration: `''A'oothu bikalimaatil-laahit-taammaati min sharri maa khalaq.'`,
            arabicVerse: `'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ'`,
            reference: `'[Hisnul 216] [Muslim 4/2080.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/216hm.mp3',
          },
        ],
      },

      {
        title: 'While returning from travel',
        data: [
          {
            duaId: 1,
            englishTranslation: `'(Allah the Great, Allah the Great, Allah the Great.) None has the right to be worshiped but Allah alone, Who has no partner. His is the dominion and His is the praise, and He is Able to do all things. We return repentant to our Lord, worshiping our Lord, and praising our Lord. He fulfilled His Promise, He aided His slave, and He alone defeated the Confederates.'`,
            transliteration: `'Allaahu 'Akbar, Allaahu 'Akbar, Allaahu 'Akbar. Laa 'ilaaha 'illallaahu wahdahu laa shareeka lahu, lahul-mulku, wa lahul-hamdu, wa Huwa 'alaa kulli shay 'in Qadeer, aayiboona, taa'iboona, 'aabidoona, lirabbinaa haamidoona, sadaqallaahu wa'dahu, wa nasara 'abdahu, wa hazamal-'ahzaaba wahdahu.'`,
            arabicVerse: `'اللَّهُ أَكْبَرُ، اللَّهُ أَكْـبَرُ، اللَّهُ أَكْـبَرُ. لَا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، آيِبُونَ تاَئِبُونَ عَابِدُونَ، لِرَبِّنَا حَامِدُونَ، صَدَقَ اللَّهُ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الأَحْزَابَ وَحْدَهُ'`,
            reference: `'[Hisnul 217] [Bukhari 7/163, Muslim 2/980.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/217hm.mp3',
          },
        ],
      },
    ],
  },

  {
    categoryId: 8,
    categoryName: 'Nature',
    data: [
      {
        title: 'During a wind storm',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, I ask You for the good of it and seek refuge in You against its evil.'`,
            transliteration: `'Allaahumma 'innee 'as'aluka khayrahaa, wa 'a'oothu bika min sharrihaa.'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهاَ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا'`,
            reference: `'[Hisnul 166] [Abu Dawud 4/326, Ibn Majah 2/1228.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/166hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah, I ask You for the good of it, for the good of what it contains, and for the good of what is sent with it. I seek refuge in You from the evil of it, from the evil of what it contains, and from the evil that is sent with it.'`,
            transliteration: `'Allaahumma 'innee 'as'aluka kthayrahaa, wa khayra maa feehaa, wa khayra maa 'ursilat bihi wa a'oothu bika min sharrihaa, wa sharri maa feehaa, wa sharri maa 'ursilat bihi.'`,
            arabicVerse: `'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا، وَخَيْرَ مَا اُرْسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا، وَشَرِّ مَا فِيهَا، وَشَرِّ مَا اُرْسِلَتْ بِهِ'`,
            reference: `'[Hisnul 167] [Muslim 2/616, Al-Bukhari 4/76.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/167hm.mp3',
          },
        ],
      },

      {
        title: 'Upon hearing thunder',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Glory is to Him Whom thunder and angels glorify due to fear of Him.'`,
            transliteration: `'Subhaanal-lathee yusabbihur-ra'du bihamdihi walmalaa'ikatu min kheefatihi.'`,
            arabicVerse: `'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ'`,
            reference: `'[Hisnul 168] [ Al-Muwatta' 2/992.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/168hm.mp3',
          },
        ],
      },

      {
        title: 'For rain',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, shower upon us abundant rain, beneficial not harmful, swiftly and not delayed.'`,
            transliteration: `'Allaahumma 'asqinaa ghaythan mugheethan maree'an maree'an, naafi'an ghayradhaarrin, 'aajilan ghayra 'aajilin.'`,
            arabicVerse: `'اللّهُمَّ اسْقِنَا غَيْثاً مُغِيثاً مَرِيئاً مَرِيعاً، نَافِعاً غَيْرَ ضَارٍّ، عَاجِلاً غَيْرَ آجِلٍ'`,
            reference: `'[Hisnul 169] [Abu Dawud 1/303.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/169hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah, send us rain. O Allah, send us rain. O Allah, send us rain.'`,
            transliteration: `'Allaahumma 'aghithnaa, Allaahumma 'aghithnaa, Allaahumma 'aghithnaa.'`,
            arabicVerse: `'اللَّهُمَّ أَغِثْنَا، اللَّهُمَّ أَغِثْنَا، اللَّهُمَّ أَغِثْنَا'`,
            reference: `'[Hisnul 170] [Al-Bukhari 1/224, Muslim 2/613.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/170hm.mp3',
          },
          {
            duaId: 3,
            englishTranslation: `'O Allah, give water to Your slaves, and Your livestock, and spread Your mercy, and revive Your dead land.'`,
            transliteration: `'Allaahum-masqi 'ibaadaka, wa bahaa'imaka, wanshur rahmataka, wa 'ahyi baladakal-mayyita.'`,
            arabicVerse: `'اللّهُمَّ اسْقِ عِبَادَكَ، وَبَهَائِمَكَ، وَانْشُرْ رَحْمَتَكَ، وَأَحْيِي بَلَدَكَ الْمَيِّتَ'`,
            reference: `'[Hisnul 171] [Abu Dawud 1/305.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/171hm.mp3',
          },
        ],
      },

      {
        title: 'When it rains',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, (bring) beneficial rain clouds.'`,
            transliteration: `'Allaahumma sayyiban naafi'an'`,
            arabicVerse: `'اللّهُمَّ صَيِّباً نَافِعاً'`,
            reference: `'[Hisnul 172] [Al-Bukhari[1032](2/518).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/172hm.mp3',
          },
        ],
      },

      {
        title: 'After rainfall',
        data: [
          {
            duaId: 1,
            englishTranslation: `'It has rained by the bounty of Allah and His mercy'`,
            transliteration: `'Mutirnaa bifadhlillaahi wa rahmatihi.'`,
            arabicVerse: `'مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ'`,
            reference: `'Al-Bukhârî [846](1/205) and Muslim [71](1/83).'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/173hm.mp3',
          },
        ],
      },

      {
        title: 'Asking for clear skies',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, let it pass us and not fall upon us, but upon the hills and mountains, and the center of the valleys, and upon the forested lands.'`,
            transliteration: `'Allaahumma hawaalaynaa wa laa 'alaynaa. Allaahumma 'alal-'aakaami wadh-dhiraabi, wa butoonil-'awdiyati, wa manaabitish-shajari.'`,
            arabicVerse: `'اللّهُمَّ حَوَالَيْنَا وَلَا عَلَيْنَا، اللَّهُمَّ عَلَى الآكَامِ وَالظِّرَابِ، وَبُطُونِ الأَوْدِيَةِ، وَمَنَابِتِ الشَّجَرِ'`,
            reference: `'[Hisnul 174] [Al-Bukhari 1/224, Muslim 1/614]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/174hm.mp3',
          },
        ],
      },

      {
        title: 'Upon sighting the crescent moon',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Allah is the Most Great. O Allah, bring us the new moon with security and Faith, with peace and in Islam, and in harmony with what our Lord loves and what pleases Him. Our Lord and your Lord is Allah.'`,
            transliteration: `'Allaahu 'Akbar, Allaahumma 'ahillahu 'alayna bil'amni wal'eemaani, wassalaamati wal-'Islaami, wattawfeeqi limaa tuhibbu Rabbanaa wa tardhaa, Rabbunaa wa Rabbukallaahu.'`,
            arabicVerse: `'اللَّهُ أَكْبَرُ، اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالَأمْنِ وَالإِيمَانِ، وَالسَّلَامَةِ وَالِإسْلَامِ، وَالتَّوْفِيقِِ لِمَا تُحِبُّ رَبَّنَا وَتَرْضَى، رَبُّنَا وَرَبُّكَ اللَّهُ'`,
            reference: `'[Hisnul 175] [At-Tirmizi 5/504, Ad-Darimi 1/336.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/175hm.mp3',
          },
        ],
      },

      {
        title: 'Upon seeing the early or premature fruit',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, bless our fruit for us, bless our town for us, bless our Sa' for us and bless our Mudd for us.(Sa' and Mudd are both dry measures used for agricultural produce by the Arabs in the Prophet's time.)'`,
            transliteration: `'Allahumma baarik lanaa fee thamarinaa , wa baarik lanaa fee madeenatinaa wa baarik lanaa fee saa'inaa, wa baarik lanaa fee muddinaa.'`,
            arabicVerse: `'اللّهُمَّ بَارِكْ لَنَا فِي ثَمَرِنَا، وَبَارِكْ لَنَا فِي مَدِينَتِنَا، وَبَارِكْ لَنَا فِي صَاعِنَا، وَبَارِكْ لَنَا فِي مُدِّنَا'`,
            reference: `'[Hisnul 187] [Muslim 2/1000.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/187hm.mp3',
          },
        ],
      },

      {
        title: 'Upon hearing a rooster crow or the braying of an ass',
        data: [
          {
            duaId: 1,
            englishTranslation: `'When you hear the cock's crow, ask Allah for His favor upon you for surely it has seen an angel. When you hear the bray of a donkey, seek refuge in Allah from Satan, for surely it has seen a devil.'`,
            transliteration: `''A 'oothu billaahi minash-Shaytaanir-rajeem.'`,
            arabicVerse: `'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيـمِ'`,
            reference: `'[Hisnul 228] [Al-Bukhari, Muslim 4/2092.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/228hm.mp3',
          },
        ],
      },

      {
        title: 'Upon hearing the barking of dogs at night',
        data: [
          {
            duaId: 1,
            englishTranslation: `'When you hear a dog barking or a donkey braying in the night, then seek refuge in Allah from them, for surely they have seen what you see not.'`,
            transliteration: `''A 'oothu billaahi minash-Shaytaanir-rajeem.'`,
            arabicVerse: `'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيـمِ'`,
            reference: `'[Hisnul 229] [Abu Dawud 4/327, Ahmad 3/306.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/229hm.mp3',
          },
        ],
      },
    ],
  },

  {
    categoryId: 9,
    categoryName: 'Home & Family',
    data: [
      {
        title: 'When wearing a garment',
        data: [
          {
            duaId: 1,
            englishTranslation: `'Praise is to Allah Who has clothed me with this (garment) and provided it for me, though I was powerless myself and incapable'`,
            transliteration: `'Alhamdu lillaahil-lathee kasaanee haathaa (aththawba) wa razaqaneehi min ghayri hawlim-minnee wa laa quwwatin.'`,
            arabicVerse: `'الْحَمْدُ لِلّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَـيـْرِ حَوْلٍ مِنِّي وَلَا قُـوَّةٍ'`,
            reference: `'[Hisnul 5] [Al-Bukhari, Muslim, Abu Dawud, Ibn Majah, At-Tirmizi, 'Irwa'ul-Ghalil 7/47.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/5hm.mp3',
          },
        ],
      },

      {
        title: 'To someone wearing a new garment',
        data: [
          {
            duaId: 1,
            englishTranslation: `'May Allah replace it when it is worn out.'`,
            transliteration: `'Tublee wa yukhliful-laahu ta'aalaa.'`,
            arabicVerse: `'تُبْـلِي وَيُـخْلِفُ اللّهُ تَعَالَى'`,
            reference: `'[Hisnul 7] [Abu Dawud 4/41, Al-Albani Sahih Abu Dawud 2/760.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/7hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'Put on new clothes, live a praise-worthy life and die as a martyr.'`,
            transliteration: `'Ilbas jadeedan, wa 'ish hameedan, wa mut shaheedan.'`,
            arabicVerse: `'اِلْبَـسْ جَدِيـداً وَعِـشْ حَمِـيداً وَمُـتْ شَهِيداً'`,
            reference: `'[Hisnul 8] [Ibn Majah 2/1178, Al-Baghawi 12/41, Al-Albani, Sahih Ibn Majah 2/275]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/8hm.mp3',
          },
        ],
      },

      {
        title: 'When wearing a new garment',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, praise is to You. You have clothed me. I ask You for its goodness and the goodness of what it has been made for, and I seek Your protection from the evil of it and the evil of what it has been made for.'`,
            transliteration: `'Allaahumma lakal-hamdu 'Anta kasawtaneehi, 'as'aluka min khayrihi wa khayri maa suni'a lahu, wa 'a'oothu bika min sharrihi wa sharri ma suni'a lahu.'`,
            arabicVerse: `'اللَّهُـمَّ لَـكَ الْحَـمْـدُ أَنْـتَ كَسَـوْتَنِيهِ، أََسْأََلُـكَ مِنْ خَـيْرِهِ وَخَـيْرِ مَا صُنِعَ لَـهُ، وَأَعُوذُ بِكَ مِنْ شَـرِّهِ وَشَـرِّ مَـا صُنِعَ لَـهُ'`,
            reference: `'[Hisnul 6] [Abu Dawud, At-Tirmizi. Al-Albani, Mukhtasar Shamd'il At-Tirmizi, p. 47.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/6hm.mp3',
          },
        ],
      },

      {
        title: 'Before undressing',
        data: [
          {
            duaId: 1,
            englishTranslation: `'In the Name of Allah.'`,
            transliteration: `'Bismillaahi'`,
            arabicVerse: `'بِسْمِ اللَّهِ'`,
            reference: `'[Hisnul 9] [At-Tirmizi 2/505, 'Irwa'ul Ghalil no. 49, Sahihul-Jami' 3/203]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/9hm.mp3',
          },
        ],
      },

      {
        title: 'Before entering the toilet',
        data: [
          {
            duaId: 1,
            englishTranslation: `'In the Name of Allah. O Allah, I seek protection in You from the male and female unclean spirits.'`,
            transliteration: `'Bismillaahi. Allaahumma 'innee 'a'oothu bika minal-khubthi walkhabaa'ith.'`,
            arabicVerse: `'بِسْمِ اللَّهِ. اللَّهُـمَّ إِنِّي أَعُـوذُ بِـكَ مِـنَ الْخُـبْثِ وَالْخَبَائِثِ'`,
            reference: `'[Hisnul 10] [Al-Bukhari 1/45, Muslim 1/283, Fathul-Bari 1/244]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/10hm.mp3',
          },
        ],
      },

      {
        title: 'After leaving the toilet',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I seek Your forgiveness.'`,
            transliteration: `'Ghufraanaka'`,
            arabicVerse: `'غُفْرَانَكَ'`,
            reference: `'[Hisnul 11] [Abu Dawud, Ibn Majah, At-Tirmizi, An-Nasa'i, Al-Qayyim's Zadul-Ma'ad, 2/387.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/11hm.mp3',
          },
        ],
      },

      {
        title: 'Upon leaving the home',
        data: [
          {
            duaId: 1,
            englishTranslation: `'In the Name of Allah, I have placed my trust in Allah, there is no might and no power except by Allah.'`,
            transliteration: `'Bismillaahi, tawakkaltu 'alallaahi, wa laa hawla wa laa quwwata ‘ illaa billaah.'`,
            arabicVerse: `'بِسْمِ اللَّهِ تَوَكَّلْـتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُـوَّةَ إِلاَّ بِاللَّ'`,
            reference: `'[Hisnul 16] [Abu Dawud 4/325, At-Tirmizi 5/490, Al-Albani, Sahih At-Tirmizi 3/151]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/16hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah, I seek refuge in You lest I misguide others, or I am misguided by others, lest I cause others to err or I am caused to err, lest I abuse others or be abused, and lest I behave foolishly or meet with the foolishness of others.'`,
            transliteration: `'Allaahumma 'innee 'a'oothu bika 'an 'adhilla, 'aw 'udhalla, 'aw 'azilla, 'aw 'uzalla, 'aw 'adhlima, 'aw 'udhlama, 'aw 'ajhala 'aw yujhala 'alayya.'`,
            arabicVerse: `'اَللَّهُـمَّ إِنِّي أَعُـوذُ بِكَ أَنْ أَضِـلَّ أَوْ أُضَـلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِـمَ أَوْ أَُظْلَـمَ، أَوْ أَجْهَلَ أَوْ يُـجْهَلَ عَلَـيَّ'`,
            reference: `'[Hisnul 17] [Abu Dawud, Ibn Majah, An-Nasa'i, At-Tirmizi, Al-Albani, Sahih At-Tirmizi 3/152, Sahih Ibn Majah 2/336]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/17hm.mp3',
          },
        ],
      },

      {
        title: 'When entering the home',
        data: [
          {
            duaId: 1,
            englishTranslation: `'In the Name of Allah we enter, in the Name of Allah we leave, and upon our Lord we depend.(One should mention the Name of Allah when entering the home and when beginning to eat; and that the devil, hearing this, says: “there is no shelter for us here tonight and no food”.)'`,
            transliteration: `'Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa 'alaaRabblnaa tawakkalnaa'`,
            arabicVerse: `'بِسْـمِ اللّهِ وَلَجْنـَا، وَبِسْـمِ اللّهِ خَـرَجْنـَا، وَعَلَـى رَبِّنـَا تَوَكّلْـنَا'`,
            reference: `'[Hisnul 18] [Abu Dawud 4/325.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/18hm.mp3',
          },
        ],
      },

      {
        title: 'For expelling the devil and his whisperings',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I seek refuge in Allah from Satan the outcast'`,
            transliteration: `''A 'oothu billaahi minash-Shaytaanir-rajeem.'`,
            arabicVerse: `'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ'`,
            reference: `'[Hisnul 141] [Abu Dawud 1/206, At-Tirmizi.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/138hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'The azan (Call to prayer)'`,
            transliteration: `''`,
            arabicVerse: `'الأذان'`,
            reference: `'[Hisnul 142] [Muslim 1/291, Al-Bukhari 1/151.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/142hm.mp3',
          },

          {
            duaId: 3,
            englishTranslation: `'Recitation of the authentic zikr (remembrance of Allah) and the Qur'an. The Devil is driven out by the invocations for morning and evening, zikr before sleeping and upon waking up, zikr for entering and leaving the house, including those for entering and leaving the mosque, and by many other authentic invocations taught to us by the Prophet (SAW) such as the reading of 'Ayatul-Kursi (Al-Baqarah 2:255), and the last two 'ayat of Surat Al-Baqarah and zikr no. 93 100 times, it will be a protection for him from the Devil throughout the day. Also call to prayer (athan).'`,
            transliteration: `''`,
            arabicVerse: `'الأذكار وقراءة القرآن'`,
            reference: `'[Hisnul 143] [Muslim 1/539.]'`,
            url: '',
          },
        ],
      },

      {
        title: 'To the newlywed',
        data: [
          {
            duaId: 1,
            englishTranslation: `'May Allah bless you, and shower His blessings upon you, and join you together in goodness.'`,
            transliteration: `'Baarakallaahu laka, wa baaraka 'alayka, wa jama'a baynakumaa fee khayrin.'`,
            arabicVerse: `'بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ'`,
            reference: `'[Hisnul 190] Abû Dâwud [2130], At-Tirmidhî [1091], and Ibn Mâjah [1905]. Also see Ŝaĥîĥ Ibn Mâjah (1/324).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/190hm.mp3',
          },
        ],
      },

      {
        title: 'Before sexual intercourse',
        data: [
          {
            duaId: 1,
            englishTranslation: `'With the Name of Allah. O Allah, keep the Devil away from us and keep the Devil away from that which You provide for us.'`,
            transliteration: `Bismillaah. Allaahumma jannibnash-Shaytaana, wa jannibish-Shaytaana maa razaqtanaa.'`,
            arabicVerse: `'بِسْمِاللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ، وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْـتَنَا'`,
            reference: `'[Hisnul 192] [Al-Bukhari 6/141, Muslim 2/1028.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/192hm.mp3',
          },
        ],
      },

      {
        title: `'When in fear of afflicting something or someone with one's eye'`,
        data: [
          {
            duaId: 1,
            englishTranslation: `'If you see anything of your brother that pleases you, or of his person or of his property (then ask Allah to bless him in it) for the envious eye is real.'`,
            transliteration: `'Allahumma barik 'alayhi.'`,
            arabicVerse: `'اللَّهُمَّ بَارِك عَلَيه'`,
            reference: `'[Hisnul 244] [Ahmad 4/447, Ibn Majah, Malik.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/244hm.mp3',
          },
        ],
      },

      {
        title: 'To ward off the deception of the obstinate devils',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I seek refuge in the Perfect Words of Allah - which neither the upright nor the corrupt may overcome - from the evil of what He created, of what He made, and of what He scattered, from the evil of what descends from the heavens, and of what rises up to them, from the evil of what He scattered in the earth and of what emerges from it, from the evil trials of night and day, and from the evil of every night visitor, except the night visitor who comes with good. O Merciful One.'`,
            transliteration: `''A'oothu bikalimaatil-laahit-taammaatil-latee laa yujaawizuhunna barrun wa laa faajimn min sharri maa khalaqa, wa bara'a wa thara'a, wa min sharri maa yanzilu minas-samaa'i, wa min sharri maa ya'ruju feehaa, wa min sharri maa thara'a fil-'ardhi, wa min sharri ma yakhruju minhaa, wa min sharri fitanil-layli wannahaari, wa min sharri kulli taariqin 'illaa taariqan yatruqu bikhayrin yaa Rahmaan.'`,
            arabicVerse: `'أَعُوذُ بكَلِمَاتِ اللَّهِ التَّامَّاتِ الَّتِي لَا يُجَاوِزُهُنَّ بَرٌّ ولَا فَاجِرٌ مِنْ شّرِّ مَا خَلقَ، وبَرَأَ وَذَرَأَ، ومِنْ شَرِّ مَا يَنْزِلُ مِنَ السَّمَاءِ، وِمنْ شَرِّ مَا يَعْرُجُ فِيهَا، ومِنْ شَرِّ مَا ذَرَأَ فِي الأَرْضِ، ومِنْ شَرِّ مَا يَخْرُجُ مِنْهَا، وِمنْ شَرِّ فِتَنِ اللَّيْلِ وَالنَّهَارِ، ومِنْ شَرِّ كُلِّ طَارِقٍ إِلَّا طَارِقاً يَطْرُقُ بْخَيْرٍ يَا رَحْمَنُ'`,
            reference: `'[Hisnul 247] [Ahmad 3/419, Ibn As-Sunni (Hadith no. 637).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/247hm.mp3',
          },
        ],
      },

      {
        title: 'General and beneficent rules',
        data: [
          {
            duaId: 1,
            englishTranslation: `'When evening descends, bring your children indoors for the devils scatter out at this hour. Then after the passing of an hour (the first hour) of the night, (you may) let them (the children) go. Close your doors while mentioning the Name of Allah, for the devil may not open a closed door. Fasten your waterskins mentioning the Name of Allah. Cover your eating vessels mentioning the Name of Allah even if you just put something over it, and extinguish your lamps.'`,
            transliteration: `''`,
            arabicVerse:
              'إذَا كَانَ جُنْحُ اللَّيْل – أوْ أمْسَيْتُم – فَكُفُّوا صِبْيَانَكُمْ؛ فَإنَّ الشَّيَاطِيْنَ تَنْتَشِرُ حِيْنَئَذٍ، فَإذَا ذَهَبَ سَاعَةٌ مِنَ اللَّيْلِ فَخَلُّوهُمْ، وَأغْلقُوا الأبْوَابَ، وَاذْكُرُوا اسْمَ اللهِ؛ فَإنَّ الشَّيْطَانَ لَا يَفْتَحُ بَابًا مُغْلَقًا، وَ أوْكُوا قِرَبَكُمْ، وَاذْكُرُوا اسْمَ اللهِ، وَ خَمِّرُوا آنِيَتَكُمْ وَاذْكُرُوا اسْمَ اللهِ، وَ لَوْ أنْ تَعْرِضُوا عَلَيْهَا شَيْئًا، وَ أطْفِئُوا مَصَابِيْحَكُمْ',
            reference: `'[Hisnul 267] [Al-Bukhari, Muslim 3/1595.]'`,
            url: '',
          },
        ],
      },
    ],
  },

  {
    categoryId: 10,
    categoryName: 'Good & Etiquette',
    data: [
      {
        title: 'Congratulation on the occasion of a birth',
        data: [
          {
            duaId: 1,
            englishTranslation: `'May Allah bless you with His gift to you, and may you (the new parent) give thanks, may the child reach the maturity of years, and may you be granted its righteousness.(1)The reply of the person being congratulated is to say: "May Allah bless you, and shower His blessings upon you, and may Allah reward you well and bestow upon you its like and reward you abundantly".(2)'`,
            transliteration: `'Baarakallaahu laka fil-mawhoobi laka, wa shakartal-waahiba , wa balagha 'ashuddahu, wa ruziqta birrahu.(1)Baarakallahu laka wa baaraka 'alayka, wa jazaakallaahu khayran, wa razaqakallaahu mithlahu, wa 'ajzala thawaabaka.(2)'`,
            arabicVerse: `'(1)بَارَكَ اللَّهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَ شَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ(2)بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ، َوجَزَاكَ اللَّهُ خَيْراً، وَرَزَقَكَ اللَّهُ مِثْلَهُ، وأَجْزَلَ ثَوَابَك'`,
            reference: `'[Hisnul 145] [An-Nawawi[Al-Athkâr](pg. 349). Also see Ŝaĥîĥ Al-Athkâr of Imam An-Nawawî (2/713) by Shaykh Salîm Al-Hilâlî.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/145hm.mp3',
          },
        ],
      },

      {
        title: 'When insulted while fasting',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I am fasting. I am fasting.'`,
            transliteration: `''Inneesaa'imun, 'innee saa'imun.'`,
            arabicVerse: `'إِنِّي صَائِمٌ، إِنِّي صَائِمٌ'`,
            reference: `'[Hisnul 186] [Al-Bukhari, Muslim 2/806.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/186hm.mp3',
          },
        ],
      },

      {
        title: 'Upon sneezing',
        data: [
          {
            duaId: 1,
            englishTranslation: `'When you sneeze, then say: "All praises and thanks are to Allah".(1)Your companion should say: "May Allah have mercy upon you".(2)Then you should replies: "May Allah guide you and set your affairs in order".(3)'`,
            transliteration: `'Alhamdu lillaah.(1)Yarhamukallaah.(2)Yahdeekumul-laahu wa yuslihu baalakum.(3)'`,
            arabicVerse: `'(1)الْحَمْدُ للَّهِ(2)يَرْحَمُكَاللَّهُ(3)يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُم'`,
            reference: `'[Hisnul 188] [Al-Bukhari 7/125.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/188hm.mp3',
          },
        ],
      },
    ],
  },

  {
    categoryId: 11,
    categoryName: 'Prayer',
    data: [
      {
        title: 'When starting ablution',
        data: [
          {
            duaId: 1,
            englishTranslation: `'In the Name of Allah'`,
            transliteration: `'Bismillaahi'`,
            arabicVerse: `'بِسْمِ اللّهِ'`,
            reference: `'[Hisnul 12] [Abu Dawud, Ibn Majah, Ahmad, 'Irwa'ul-Ghain 1/122.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/12hm.mp3',
          },
        ],
      },

      {
        title: 'Upon completing the ablution',
        data: [
          {
            duaId: 1,
            englishTranslation: `'I bear witness that none has the right to be worshiped but Allah alone, Who has no partner; and I bear witness that Muhammad is His slave and His Messenger.'`,
            transliteration: `''Ash-hadu 'an laa 'ilaaha 'illallaahu wahdahu laa shareeka lahu wa 'ash-hadu 'anna Muhammadan 'abduhu wa Rasooluhu.'`,
            arabicVerse: `'أَشْهَدُ أَنْ لَا إِلَـهَ إِلاَّ اللّهُ وَحْدَهُ لَا شَريـكَ لَـهُ وَأَشْهَدُ أَنَّ مُحَمَّـداً عَبْـدُهُ وَرَسُـولُـهُ'`,
            reference: `'[Hisnul 13] [Muslim 1/209.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/13hm.mp3',
          },

          {
            duaId: 2,
            englishTranslation: `'O Allah, make me among those who turn to You in repentance, and make me among those who are purified.'`,
            transliteration: `'Allaahummaj'alnee minat-tawwaabeena waj'alnee minal-mutatahhireen.'`,
            arabicVerse: `'اَللَّهُـمَّ اجْعَلْنِـي مِنَ التَّـوَّابِينَ وَاجْعَـلْنِي مِنَ الْمُتَطَهِّـرِينَ'`,
            reference: `'[Hisnul 14] [At-Tirmizi 1/78, Al-Albani, Sahih At-Tirmizi 1/18]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/14hm.mp3',
          },

          {
            duaId: 3,
            englishTranslation: `'Glory is to You, O Allah, and praise. I bear witness that there is none worthy of worship but You. I seek Your forgiveness and turn to You in repentance.'`,
            transliteration: `'Subhaanaka Allaahumma wa bihamdika, 'ash-hadu 'an laa 'ilaaha 'illaa 'Anta, 'astaghfiruka wa 'atoobu 'ilayk.'`,
            arabicVerse: `'سُبْحـَانَكَ اللَّهُـمَّ وَبِحَمْدِكَ، أَشْهَـدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَـيْكَ'`,
            reference: `'[Hisnul 15] [An-Nasa'i, 'Amalul-Yawm wal-Laylah, p. 173, Al-Albani, 'Irwa'ul-Ghalil 1/135, 2/94.]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/15hm.mp3',
          },
        ],
      },

      {
        title: 'When going to the mosque',
        data: [
          {
            duaId: 1,
            englishTranslation: `'O Allah, place light in my heart, and on my tongue light, and in my ears light and in my sight light, and above me light, and below me light, and to my right light, and to my left light, and before me light and behind me light. Place in my soul light. Magnify for me light, and amplify for me light. Make for me light and make me a light. O Allah, grant me light, and place light in my nerves, and in my body light and in my blood light and in my hair light and in my skin light. O Allah, make for me a light in my grave... And a light in my bones. Increase me in light, increase me in light, increase me in light. Grant me light upon light.'`,
            transliteration: `'Allaahummaj'al fee qalbee nooran, wa fee lisaaanee nooran, wa fee sam'ee nooran, wa fee basaree nooran, wa min fawqee nooran, wa min tahtee nooran, wa 'an yameenee nooran, wa 'an shimaalee nooran, wa min 'amaamee nooran, wa min khalfee nooran, waj'alfee nafsee nooran, wa 'a'dhim lee nooran, wa 'adhdhim lee nooran, wafal lee nooran, waj'alnee nooran, Allaahumma 'a'tinee nooran, waj'al fee 'asabee nooran, wafee lahmee nooran, wafee damee nooran, wa fee sha'ree nooran, wa fee basharee nooran. Allaahummaj'al lee nooran fee qabree... wa nooran fee 'idhaamee. Wa zidnee nooran, wa zidnee nooran, wa zidnee nooran. Wa hab lee nooran 'alaa noor.'`,
            arabicVerse: `'اللَّهُـمَّ اجْعَـلْ فِي قَلْبِـي نُوراً، وَفِي لِسَـانِي نُوراً، وَفِي سَمْعِي نُوراً، وَفِي بَصَرِيِ نُورًا، وَمِنْ فََوْقِي نُوراً، وَ مِنْ تَحْتِي نُوراً، وَ عَنْ يَمِينِي نُوراَ، وعَنْ شِمَالِي نُوراً، وَمِنْ أَماَمِي نُوراً،,وَمِنْ خَلْفِي نُوراً، وَاجْعَلْ فِي نَفْسِي نُوراً، وأََعْظِمْ لِي نُوراً، وَعَظِِّمْ لِي نُوراً، وَاجْعَلْ لِي نُوراً، واجْعَلْنِي نُوراً، ألَلَّهُمَّ أَعْطِنِي نُوراً، وَاجْعَلْ فِي عَصَبِي نُوراً، وَفِي لَحْمِي نُوراً، وَفِي دَمِي نُوراً، وَفِي شَعْرِي نُوراً، وفِي بَشَرِي نُوراً، أَللَّهُمَّ اجِعَلْ لِي نُوراً فِي قَّبْرِي... وَ نُوراَ فِي عِظاَمِي، وَزِدْنِي نُوراً، وَزِدْنِي نُوراَ، وَزِدْنِي نُوراً، وَهَبْ لِي نُوراً عَلَى نُوراً'`,
            reference: `'[Hisnul 19] [Al-Bukhari 11/116 (Hadith no. 6316), Muslim 1/526 (Hadith no. 763).]'`,
            url: 'https://admin.gomasjid.co.uk/assets/dua/19hm.mp3',
          },
        ],
      },
    ],
  },
];
  