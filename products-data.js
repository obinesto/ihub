// Single source of truth for the store catalog.
// Every listing, search, detail, cart, checkout and admin view reads from
// here (via getStoreCatalog), so edits in one place reach the whole store.

const STORE_PRODUCTS = [
    {
        "id": 1,
        "category": "iphone",
        "line": "11",
        "image": "assets/images/iphone/11/apple-iphone-11-pro-max-6.5-4gb-ram-64gb-rom-gold.jpg",
        "name": "Apple iphone 11 Pro Max 64gb (gold)",
        "price": "360,000",
        "beforeprice": "400,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Processor Apple A13 Bionic    Rear Camera 12 MP + 12 MP    Front Camera 12 MP    Battery 3110 mAh    Display 6.1 inches General Launch Date September 20, 2019 (Official)    Brand Apple    Model iPhone XI    Operating System iOS v13.0   SIM Slot(s) Dual SIM, GSM+GSM    SIM Size SIM1: Nano    SIM2: eSIM    Network 4G: Available (supports Indian bands)    3G: Available, 2G: Available    Fingerprint Sensor No    Quick Charging yes Design Height 9 mm Compare Size    Width 7 mm    Thickness 3 mm    Weight 194 grams    Colours Black, Green, Purple, Red, White, Yellow    Waterproof yes Water resistant (up to 30 minutes in a depth of 2 meter), IP68    Ruggedness Dust proof Display Screen Size 6.1 inches (15.49 cm)    Screen Resolution 828 x 1792 pixels    Aspect Ratio 5:9    Bezel-less display yes with notch    Pixel Density 324 ppi    Display Type IPS LCD    Screen Protection yes    Touch Screen yes 3D Touch Touchscreen, Multi-touch    Screen to Body Ratio (calculated) 79 % Performance Chipset Apple A13 Bionic    Processor Hexa Core (2.65 GHz, Dual core, Lightning + 1.8 GHz, Quad core, Thunder)    Architecture 64 bit    Graphics Apple GPU (four-core graphics)    RAM 4 GB MAIN CAMERA Resolution 12 MP + 12 MP Dual Primary Cameras    Sensor Exmor-RS CMOS Sensor    Autofocus yes Phase Detection autofocus    Physical Aperture 8    Optical Image Stabilisation yes    Flash yes Quad LED True Tone Flash    Image Resolution 4000 x 3000 Pixels    Settings Exposure compensation, ISO control    Shooting Modes Continuos Shooting, High Dynamic Range mode (HDR), Burst mode    Camera Features 5 x Digital Zoom, 2 x Optical Zoom, Auto Flash, Face detection, Touch to focus    Video Recording 3840x2160 @ 30 fps, 1920x1080 @ 60 fps FRONT CAMERA Resolution 12 MP Front Camera    Physical Aperture 2    Flash yes Retina Flash    Video Recording 3840x2160 @ 30 fps, 1920x1080 @ 60 fps Battery Capacity 3110 mAh    Type Li-ion    User-Replaceable No    Wireless Charging yes    Quick Charging yes Fast, 50 % in 30 minutes                                         "
    },
    {
        "id": 2,
        "category": "iphone",
        "line": "11",
        "image": "assets/images/iphone/11/iphone-11-6.1-4gb-ram-64gb-rom-3110mah-purple-apple.jpg",
        "name": "Apple IPhone 11 Pro Max 64gb (nano-sim purple)",
        "price": "2,250,000",
        "beforeprice": "2,500,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Processor Apple A13 Bionic    Rear Camera 12 MP + 12 MP    Front Camera 12 MP    Battery 3110 mAh    Display 6.1 inches General Launch Date September 20, 2019 (Official)    Brand Apple    Model iPhone XI    Operating System iOS v13.0   SIM Slot(s) Dual SIM, GSM+GSM    SIM Size SIM1: Nano    SIM2: eSIM    Network 4G: Available (supports Indian bands)    3G: Available, 2G: Available    Fingerprint Sensor No    Quick Charging yes Design Height 9 mm Compare Size    Width 7 mm    Thickness 3 mm    Weight 194 grams    Colours Black, Green, Purple, Red, White, Yellow    Waterproof yes Water resistant (up to 30 minutes in a depth of 2 meter), IP68    Ruggedness Dust proof Display Screen Size 6.1 inches (15.49 cm)    Screen Resolution 828 x 1792 pixels    Aspect Ratio 5:9    Bezel-less display yes with notch    Pixel Density 324 ppi    Display Type IPS LCD    Screen Protection yes    Touch Screen yes 3D Touch Touchscreen, Multi-touch    Screen to Body Ratio (calculated) 79 % Performance Chipset Apple A13 Bionic    Processor Hexa Core (2.65 GHz, Dual core, Lightning + 1.8 GHz, Quad core, Thunder)    Architecture 64 bit    Graphics Apple GPU (four-core graphics)    RAM 4 GB MAIN CAMERA Resolution 12 MP + 12 MP Dual Primary Cameras    Sensor Exmor-RS CMOS Sensor    Autofocus yes Phase Detection autofocus    Physical Aperture 8    Optical Image Stabilisation yes    Flash yes Quad LED True Tone Flash    Image Resolution 4000 x 3000 Pixels    Settings Exposure compensation, ISO control    Shooting Modes Continuos Shooting, High Dynamic Range mode (HDR), Burst mode    Camera Features 5 x Digital Zoom, 2 x Optical Zoom, Auto Flash, Face detection, Touch to focus    Video Recording 3840x2160 @ 30 fps, 1920x1080 @ 60 fps FRONT CAMERA Resolution 12 MP Front Camera    Physical Aperture 2    Flash yes Retina Flash    Video Recording 3840x2160 @ 30 fps, 1920x1080 @ 60 fps Battery Capacity 3110 mAh    Type Li-ion    User-Replaceable No    Wireless Charging yes    Quick Charging yes Fast, 50 % in 30 minutes"
    },
    {
        "id": 3,
        "category": "iphone",
        "line": "11",
        "image": "assets/images/iphone/11/iphone-11-pro-max-4gb-ram-256gb-romios-4g-lte-midnight-green.jpg",
        "name": "Apple IPhone 11 Pro Max 256gb (4g-lte midnight-green)",
        "price": "1,890,000",
        "beforeprice": "2,100,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Processor Apple A13 Bionic    Rear Camera 12 MP + 12 MP    Front Camera 12 MP    Battery 3110 mAh    Display 6.1 inches General Launch Date September 20, 2019 (Official)    Brand Apple    Model iPhone XI    Operating System iOS v13.0   SIM Slot(s) Dual SIM, GSM+GSM    SIM Size SIM1: Nano    SIM2: eSIM    Network 4G: Available (supports Indian bands)    3G: Available, 2G: Available    Fingerprint Sensor No    Quick Charging yes Design Height 9 mm Compare Size    Width 7 mm    Thickness 3 mm    Weight 194 grams    Colours Black, Green, Purple, Red, White, Yellow    Waterproof yes Water resistant (up to 30 minutes in a depth of 2 meter), IP68    Ruggedness Dust proof Display Screen Size 6.1 inches (15.49 cm)    Screen Resolution 828 x 1792 pixels    Aspect Ratio 5:9    Bezel-less display yes with notch    Pixel Density 324 ppi    Display Type IPS LCD    Screen Protection yes    Touch Screen yes 3D Touch Touchscreen, Multi-touch    Screen to Body Ratio (calculated) 79 % Performance Chipset Apple A13 Bionic    Processor Hexa Core (2.65 GHz, Dual core, Lightning + 1.8 GHz, Quad core, Thunder)    Architecture 64 bit    Graphics Apple GPU (four-core graphics)    RAM 4 GB MAIN CAMERA Resolution 12 MP + 12 MP Dual Primary Cameras    Sensor Exmor-RS CMOS Sensor    Autofocus yes Phase Detection autofocus    Physical Aperture 8    Optical Image Stabilisation yes    Flash yes Quad LED True Tone Flash    Image Resolution 4000 x 3000 Pixels    Settings Exposure compensation, ISO control    Shooting Modes Continuos Shooting, High Dynamic Range mode (HDR), Burst mode    Camera Features 5 x Digital Zoom, 2 x Optical Zoom, Auto Flash, Face detection, Touch to focus    Video Recording 3840x2160 @ 30 fps, 1920x1080 @ 60 fps FRONT CAMERA Resolution 12 MP Front Camera    Physical Aperture 2    Flash yes Retina Flash    Video Recording 3840x2160 @ 30 fps, 1920x1080 @ 60 fps Battery Capacity 3110 mAh    Type Li-ion    User-Replaceable No    Wireless Charging yes    Quick Charging yes Fast, 50 % in 30 minutes"
    },
    {
        "id": 4,
        "category": "iphone",
        "line": "11",
        "image": "assets/images/iphone/11/iphone-11-pro-max-6.5-4gb-ram-256gb-rom-space-gray-apple.jpg",
        "name": "Iphone 11 pro max 256gb (gray)",
        "price": "2,295,000",
        "beforeprice": "2,550,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Processor Apple A13 Bionic    Rear Camera 12 MP + 12 MP    Front Camera 12 MP    Battery 3110 mAh    Display 6.1 inches General Launch Date September 20, 2019 (Official)    Brand Apple    Model iPhone XI    Operating System iOS v13.0   SIM Slot(s) Dual SIM, GSM+GSM    SIM Size SIM1: Nano    SIM2: eSIM    Network 4G: Available (supports Indian bands)    3G: Available, 2G: Available    Fingerprint Sensor No    Quick Charging yes Design Height 9 mm Compare Size    Width 7 mm    Thickness 3 mm    Weight 194 grams    Colours Black, Green, Purple, Red, White, Yellow    Waterproof yes Water resistant (up to 30 minutes in a depth of 2 meter), IP68    Ruggedness Dust proof Display Screen Size 6.1 inches (15.49 cm)    Screen Resolution 828 x 1792 pixels    Aspect Ratio 5:9    Bezel-less display yes with notch    Pixel Density 324 ppi    Display Type IPS LCD    Screen Protection yes    Touch Screen yes 3D Touch Touchscreen, Multi-touch    Screen to Body Ratio (calculated) 79 % Performance Chipset Apple A13 Bionic    Processor Hexa Core (2.65 GHz, Dual core, Lightning + 1.8 GHz, Quad core, Thunder)    Architecture 64 bit    Graphics Apple GPU (four-core graphics)    RAM 4 GB MAIN CAMERA Resolution 12 MP + 12 MP Dual Primary Cameras    Sensor Exmor-RS CMOS Sensor    Autofocus yes Phase Detection autofocus    Physical Aperture 8    Optical Image Stabilisation yes    Flash yes Quad LED True Tone Flash    Image Resolution 4000 x 3000 Pixels    Settings Exposure compensation, ISO control    Shooting Modes Continuos Shooting, High Dynamic Range mode (HDR), Burst mode    Camera Features 5 x Digital Zoom, 2 x Optical Zoom, Auto Flash, Face detection, Touch to focus    Video Recording 3840x2160 @ 30 fps, 1920x1080 @ 60 fps FRONT CAMERA Resolution 12 MP Front Camera    Physical Aperture 2    Flash yes Retina Flash    Video Recording 3840x2160 @ 30 fps, 1920x1080 @ 60 fps Battery Capacity 3110 mAh    Type Li-ion    User-Replaceable No    Wireless Charging yes    Quick Charging yes Fast, 50 % in 30 minutes"
    },
    {
        "id": 5,
        "category": "iphone",
        "line": "13",
        "image": "assets/images/iphone/13/apple-iphone-13-pro-max-6.7-256gb-rom-6gb-ram-4352ma-silver.jpg",
        "name": "Apple iphone 13 Pro Max 256gb (silver)",
        "price": "360,000",
        "beforeprice": "400,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Rear camera: Wide (main): 12 MP, f/1.5, 26mm, 1.9µm, dual pixel PDAF, sensor-shift OIS; Telephoto: 12 MP, f/2.8, 77mm, PDAF, OIS, 3x optical zoom; Ultra wide angle: 12 MP, f/1.8, 13mm, 120˚, PDAF; Depth: TOF 3D LiDAR scanner.Front camera: Wide (main): 12 MP, f/2.2, 23mm, 1/3.6″; Depth: SL 3D.Video capture: Rear camera: 4K@24/30/60fps, 1080p@30/60/120/240fps, 10‑bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode, stereo sound rec; Front camera: 4K@24/25/30/60fps, 1080p@30/60/120fps, gyro-EIS.Battery: 3095mAh; Fast charging 23W, 50% in 30 min (advertised), USB Power Delivery 2.0, MagSafe wireless charging 15W, Qi magnetic fast wireless charging 7.5W.Misc: Face ID, accelerometer, gyro, proximity, compass, barometer; NFC; Siri natural language commands and dictation, Ultra Wideband (UWB) support.Rear camera: Wide (main): 12 MP, f/1.5, 26mm, 1.9µm, dual pixel PDAF, sensor-shift OIS; Telephoto: 12 MP, f/2.8, 77mm, PDAF, OIS, 3x optical zoom; Ultra wide angle: 12 MP, f/1.8, 13mm, 120˚, PDAF; Depth: TOF 3D LiDAR scanner.Front camera: Wide (main): 12 MP, f/2.2, 23mm, 1/3.6″; Depth: SL 3D.Video capture: Rear camera: 4K@24/30/60fps, 1080p@30/60/120/240fps, 10‑bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode, stereo sound rec; Front camera: 4K@24/25/30/60fps, 1080p@30/60/120fps, gyro-EIS.Battery: 3095mAh; Fast charging 23W, 50% in 30 min (advertised), USB Power Delivery 2.0, MagSafe wireless charging 15W, Qi magnetic fast wireless charging 7.5W.Misc: Face ID, accelerometer, gyro, proximity, compass, barometer; NFC; Siri natural language commands and dictation, Ultra Wideband (UWB) support."
    },
    {
        "id": 6,
        "category": "iphone",
        "line": "13",
        "image": "assets/images/iphone/13/iphone-13-pro-max-6.7-super-retina-xdr-display-with-promotion-6gb-ram-512gb-rom-ios-15-5g-facetime-gold.jpg",
        "name": "IPhone 13 Pro Max 512gb (gold)",
        "price": "2,250,000",
        "beforeprice": "2,500,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Rear camera: Wide (main): 12 MP, f/1.5, 26mm, 1.9µm, dual pixel PDAF, sensor-shift OIS; Telephoto: 12 MP, f/2.8, 77mm, PDAF, OIS, 3x optical zoom; Ultra wide angle: 12 MP, f/1.8, 13mm, 120˚, PDAF; Depth: TOF 3D LiDAR scanner.Front camera: Wide (main): 12 MP, f/2.2, 23mm, 1/3.6″; Depth: SL 3D.Video capture: Rear camera: 4K@24/30/60fps, 1080p@30/60/120/240fps, 10‑bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode, stereo sound rec; Front camera: 4K@24/25/30/60fps, 1080p@30/60/120fps, gyro-EIS.Battery: 3095mAh; Fast charging 23W, 50% in 30 min (advertised), USB Power Delivery 2.0, MagSafe wireless charging 15W, Qi magnetic fast wireless charging 7.5W.Misc: Face ID, accelerometer, gyro, proximity, compass, barometer; NFC; Siri natural language commands and dictation, Ultra Wideband (UWB) support.Rear camera: Wide (main): 12 MP, f/1.5, 26mm, 1.9µm, dual pixel PDAF, sensor-shift OIS; Telephoto: 12 MP, f/2.8, 77mm, PDAF, OIS, 3x optical zoom; Ultra wide angle: 12 MP, f/1.8, 13mm, 120˚, PDAF; Depth: TOF 3D LiDAR scanner.Front camera: Wide (main): 12 MP, f/2.2, 23mm, 1/3.6″; Depth: SL 3D.Video capture: Rear camera: 4K@24/30/60fps, 1080p@30/60/120/240fps, 10‑bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode, stereo sound rec; Front camera: 4K@24/25/30/60fps, 1080p@30/60/120fps, gyro-EIS.Battery: 3095mAh; Fast charging 23W, 50% in 30 min (advertised), USB Power Delivery 2.0, MagSafe wireless charging 15W, Qi magnetic fast wireless charging 7.5W.Misc: Face ID, accelerometer, gyro, proximity, compass, barometer; NFC; Siri natural language commands and dictation, Ultra Wideband (UWB) support."
    },
    {
        "id": 7,
        "category": "iphone",
        "line": "13",
        "image": "assets/images/iphone/13/iphone-13-pro-max-6.7-super-retina-xdr-display-with-promotion-6gb-ram-512gb-rom-ios-15-5g-facetime-sierra-blue-apple.jpg",
        "name": "IPhone 13 Pro 512gb (blue)",
        "price": "1,877,490",
        "beforeprice": "2,086,100",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Rear camera: Wide (main): 12 MP, f/1.5, 26mm, 1.9µm, dual pixel PDAF, sensor-shift OIS; Telephoto: 12 MP, f/2.8, 77mm, PDAF, OIS, 3x optical zoom; Ultra wide angle: 12 MP, f/1.8, 13mm, 120˚, PDAF; Depth: TOF 3D LiDAR scanner.Front camera: Wide (main): 12 MP, f/2.2, 23mm, 1/3.6″; Depth: SL 3D.Video capture: Rear camera: 4K@24/30/60fps, 1080p@30/60/120/240fps, 10‑bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode, stereo sound rec; Front camera: 4K@24/25/30/60fps, 1080p@30/60/120fps, gyro-EIS.Battery: 3095mAh; Fast charging 23W, 50% in 30 min (advertised), USB Power Delivery 2.0, MagSafe wireless charging 15W, Qi magnetic fast wireless charging 7.5W.Misc: Face ID, accelerometer, gyro, proximity, compass, barometer; NFC; Siri natural language commands and dictation, Ultra Wideband (UWB) support.Rear camera: Wide (main): 12 MP, f/1.5, 26mm, 1.9µm, dual pixel PDAF, sensor-shift OIS; Telephoto: 12 MP, f/2.8, 77mm, PDAF, OIS, 3x optical zoom; Ultra wide angle: 12 MP, f/1.8, 13mm, 120˚, PDAF; Depth: TOF 3D LiDAR scanner.Front camera: Wide (main): 12 MP, f/2.2, 23mm, 1/3.6″; Depth: SL 3D.Video capture: Rear camera: 4K@24/30/60fps, 1080p@30/60/120/240fps, 10‑bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode, stereo sound rec; Front camera: 4K@24/25/30/60fps, 1080p@30/60/120fps, gyro-EIS.Battery: 3095mAh; Fast charging 23W, 50% in 30 min (advertised), USB Power Delivery 2.0, MagSafe wireless charging 15W, Qi magnetic fast wireless charging 7.5W.Misc: Face ID, accelerometer, gyro, proximity, compass, barometer; NFC; Siri natural language commands and dictation, Ultra Wideband (UWB) support."
    },
    {
        "id": 8,
        "category": "iphone",
        "line": "13",
        "image": "assets/images/iphone/13/apple-iphone-13-pro-max-6.7-256gb-rom-6gb-ram-4352ma-silver.jpg",
        "name": "iphone 13 256gb (silver)",
        "price": "4,386,780",
        "beforeprice": "4,874,200",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Rear camera: Wide (main): 12 MP, f/1.5, 26mm, 1.9µm, dual pixel PDAF, sensor-shift OIS; Telephoto: 12 MP, f/2.8, 77mm, PDAF, OIS, 3x optical zoom; Ultra wide angle: 12 MP, f/1.8, 13mm, 120˚, PDAF; Depth: TOF 3D LiDAR scanner.Front camera: Wide (main): 12 MP, f/2.2, 23mm, 1/3.6″; Depth: SL 3D.Video capture: Rear camera: 4K@24/30/60fps, 1080p@30/60/120/240fps, 10‑bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode, stereo sound rec; Front camera: 4K@24/25/30/60fps, 1080p@30/60/120fps, gyro-EIS.Battery: 3095mAh; Fast charging 23W, 50% in 30 min (advertised), USB Power Delivery 2.0, MagSafe wireless charging 15W, Qi magnetic fast wireless charging 7.5W.Misc: Face ID, accelerometer, gyro, proximity, compass, barometer; NFC; Siri natural language commands and dictation, Ultra Wideband (UWB) support.Rear camera: Wide (main): 12 MP, f/1.5, 26mm, 1.9µm, dual pixel PDAF, sensor-shift OIS; Telephoto: 12 MP, f/2.8, 77mm, PDAF, OIS, 3x optical zoom; Ultra wide angle: 12 MP, f/1.8, 13mm, 120˚, PDAF; Depth: TOF 3D LiDAR scanner.Front camera: Wide (main): 12 MP, f/2.2, 23mm, 1/3.6″; Depth: SL 3D.Video capture: Rear camera: 4K@24/30/60fps, 1080p@30/60/120/240fps, 10‑bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode, stereo sound rec; Front camera: 4K@24/25/30/60fps, 1080p@30/60/120fps, gyro-EIS.Battery: 3095mAh; Fast charging 23W, 50% in 30 min (advertised), USB Power Delivery 2.0, MagSafe wireless charging 15W, Qi magnetic fast wireless charging 7.5W.Misc: Face ID, accelerometer, gyro, proximity, compass, barometer; NFC; Siri natural language commands and dictation, Ultra Wideband (UWB) support."
    },
    {
        "id": 9,
        "category": "iphone",
        "line": "14",
        "image": "assets/images/iphone/14/apple-iphone-14-pro-max-6.7-128gb-rom-6gb-ram-nano-sim-black.jpg",
        "name": "Apple iphone 14 Pro 128gb (black)",
        "price": "360,000",
        "beforeprice": "400,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "iPhone 14 Pro. The list of novelties this year includes the notch morphing into a pill, the introduction of an Always-On display, and an all-new primary camera - and while you can get all of that on the 14 Pro, the extra screen estate and longevity coupled with the Max's 'ultimate' status mean it has a market niche of its own.The Face ID notch that's been with us since the iPhone X was nobody's favorite, and perhaps its reincarnation as a pill is a step towards its eventual removal. But not before turning the eyesore into a feature - the pill is a Dynamic Island of notifications, blurring the line between hardware and software.In a similar vein is the Always-On display - a software feature only made possible now in Apple's world thanks to LTPO displays being able to ramp down to 1Hz refresh rate.A massive increase in brightness is also among the key developments this year, this one solely in the hardware department.Late to yet another party, Apple finally joins virtually ever other manufacturer and introduces a camera with a Quad Bayer type sensor - the specs on the 48MP main unit don't read like any other, so apparently, it's an exclusive design. The telephoto remains unchanged, but the ultra-wide has gotten a sensor size upgrade, while the front-facing one now features autofocus (and even OIS).On the hardware front, there's the mandatory chipset update, of course, and little else worth mentioning. Well, there's the blanked-out SIM card slot. Crash detection and emergency sort-of satellite connectivity are also on the list of new features combining software and hardware.iPhone 14 Pro and iPhone 14 Pro do not include a power adapter or Ear Pods. Included in the box is a USB‑C to Lightning Cable that supports fast charging and is compatible with USB‑C power adapters and computer ports.We encourage you to re‑use your current USB‑A to lightning cables, power adapters and headphones that are compatible with these iPhone models. But if you need any new Apple power adapters or headphones, they are available for purchase."
    },
    {
        "id": 10,
        "category": "iphone",
        "line": "14",
        "image": "assets/images/iphone/14/apple-iphone-14-pro-max-6.7-128gb-rom-6gb-ram-nano-sim-silver.jpg",
        "name": "Apple IPhone 14 Pro Max 128gb (nano-sim silver)",
        "price": "1,877,490",
        "beforeprice": "2,086,100",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "iPhone 14 Pro. The list of novelties this year includes the notch morphing into a pill, the introduction of an Always-On display, and an all-new primary camera - and while you can get all of that on the 14 Pro, the extra screen estate and longevity coupled with the Max's 'ultimate' status mean it has a market niche of its own.The Face ID notch that's been with us since the iPhone X was nobody's favorite, and perhaps its reincarnation as a pill is a step towards its eventual removal. But not before turning the eyesore into a feature - the pill is a Dynamic Island of notifications, blurring the line between hardware and software.In a similar vein is the Always-On display - a software feature only made possible now in Apple's world thanks to LTPO displays being able to ramp down to 1Hz refresh rate.A massive increase in brightness is also among the key developments this year, this one solely in the hardware department.Late to yet another party, Apple finally joins virtually ever other manufacturer and introduces a camera with a Quad Bayer type sensor - the specs on the 48MP main unit don't read like any other, so apparently, it's an exclusive design. The telephoto remains unchanged, but the ultra-wide has gotten a sensor size upgrade, while the front-facing one now features autofocus (and even OIS).On the hardware front, there's the mandatory chipset update, of course, and little else worth mentioning. Well, there's the blanked-out SIM card slot. Crash detection and emergency sort-of satellite connectivity are also on the list of new features combining software and hardware.iPhone 14 Pro and iPhone 14 Pro do not include a power adapter or Ear Pods. Included in the box is a USB‑C to Lightning Cable that supports fast charging and is compatible with USB‑C power adapters and computer ports.We encourage you to re‑use your current USB‑A to lightning cables, power adapters and headphones that are compatible with these iPhone models. But if you need any new Apple power adapters or headphones, they are available for purchase."
    },
    {
        "id": 11,
        "category": "iphone",
        "line": "14",
        "image": "assets/images/iphone/14/iphone-14-pro-max-6.7-6gb-ram-128gb-rom-deep-purple.jpg",
        "name": "IPhone 14 Pro max 128gb (purple)",
        "price": "1,800,000",
        "beforeprice": "2,000,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "iPhone 14 Pro. The list of novelties this year includes the notch morphing into a pill, the introduction of an Always-On display, and an all-new primary camera - and while you can get all of that on the 14 Pro, the extra screen estate and longevity coupled with the Max's 'ultimate' status mean it has a market niche of its own.The Face ID notch that's been with us since the iPhone X was nobody's favorite, and perhaps its reincarnation as a pill is a step towards its eventual removal. But not before turning the eyesore into a feature - the pill is a Dynamic Island of notifications, blurring the line between hardware and software.In a similar vein is the Always-On display - a software feature only made possible now in Apple's world thanks to LTPO displays being able to ramp down to 1Hz refresh rate.A massive increase in brightness is also among the key developments this year, this one solely in the hardware department.Late to yet another party, Apple finally joins virtually ever other manufacturer and introduces a camera with a Quad Bayer type sensor - the specs on the 48MP main unit don't read like any other, so apparently, it's an exclusive design. The telephoto remains unchanged, but the ultra-wide has gotten a sensor size upgrade, while the front-facing one now features autofocus (and even OIS).On the hardware front, there's the mandatory chipset update, of course, and little else worth mentioning. Well, there's the blanked-out SIM card slot. Crash detection and emergency sort-of satellite connectivity are also on the list of new features combining software and hardware.iPhone 14 Pro and iPhone 14 Pro do not include a power adapter or Ear Pods. Included in the box is a USB‑C to Lightning Cable that supports fast charging and is compatible with USB‑C power adapters and computer ports.We encourage you to re‑use your current USB‑A to lightning cables, power adapters and headphones that are compatible with these iPhone models. But if you need any new Apple power adapters or headphones, they are available for purchase."
    },
    {
        "id": 12,
        "category": "iphone",
        "line": "14",
        "image": "assets/images/iphone/14/iphone-14-pro-max-6.7-256gb-dual-nano-sim-gold-apple.jpg",
        "name": "iphone 14 256gb (gold)",
        "price": "1,602,000",
        "beforeprice": "1,780,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "iPhone 14 Pro. The list of novelties this year includes the notch morphing into a pill, the introduction of an Always-On display, and an all-new primary camera - and while you can get all of that on the 14 Pro, the extra screen estate and longevity coupled with the Max's 'ultimate' status mean it has a market niche of its own.The Face ID notch that's been with us since the iPhone X was nobody's favorite, and perhaps its reincarnation as a pill is a step towards its eventual removal. But not before turning the eyesore into a feature - the pill is a Dynamic Island of notifications, blurring the line between hardware and software.In a similar vein is the Always-On display - a software feature only made possible now in Apple's world thanks to LTPO displays being able to ramp down to 1Hz refresh rate.A massive increase in brightness is also among the key developments this year, this one solely in the hardware department.Late to yet another party, Apple finally joins virtually ever other manufacturer and introduces a camera with a Quad Bayer type sensor - the specs on the 48MP main unit don't read like any other, so apparently, it's an exclusive design. The telephoto remains unchanged, but the ultra-wide has gotten a sensor size upgrade, while the front-facing one now features autofocus (and even OIS).On the hardware front, there's the mandatory chipset update, of course, and little else worth mentioning. Well, there's the blanked-out SIM card slot. Crash detection and emergency sort-of satellite connectivity are also on the list of new features combining software and hardware.iPhone 14 Pro and iPhone 14 Pro do not include a power adapter or Ear Pods. Included in the box is a USB‑C to Lightning Cable that supports fast charging and is compatible with USB‑C power adapters and computer ports.We encourage you to re‑use your current USB‑A to lightning cables, power adapters and headphones that are compatible with these iPhone models. But if you need any new Apple power adapters or headphones, they are available for purchase."
    },
    {
        "id": 13,
        "category": "iphone",
        "line": "15",
        "image": "assets/images/iphone/15/apple-iphone-15-pro-128gb-nano-sim-natural-titanium-.jpg",
        "name": "Apple iphone 15 Pro 128gb (natural-titanium)",
        "price": "1,800,000",
        "beforeprice": "2,000,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "iPhone 15 Pro Forged in titanium and features the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system FORGED IN TITANIUM  iPhone 15 Pro has a strong and light aerospace grade titanium design with a textured matte glass back. It also features a Ceramic Shield front that is tougher than any smartphone glass. And it is splash, water, and dust resistant.ADVANCED DISPLAY  The 6.1 Inches Super Retina XDR display with ProMotion ramps up refresh rates to 120Hz when you need exceptional graphics performance.Dynamic Island bubbles up alerts and Live Activities. Plus, with Always On display, your Lock Screen stays glanceable, so you dont have to tap it to stay in the know.GAME-CHANGING A17 PRO CHIP  A Pro-class GPU makes mobile games feel so immersive, with rich environments and realistic characters. A17 Pro is also incredibly efficient and helps to deliver amazing all day battery lifePOWERFUL PRO CAMERA SYSTEM  Get incredible framing flexibility with 7 pro lenses. Capture super high resolution photos with more color and detail using the 48MP Main camera. And take sharp close ups from far away with the 3x Telephoto camera on iPhone 15 ProCUSTOMIZABLE ACTION BUTTON  Action button is a fast track to your favorite feature. Just set the one you want, like Silent mode, Camera, Voice Memo, Shortcut, and more. Then press and hold to launch the action.PRO CONNECTIVITY  The new USB-C connector lets you charge your Mac or iPad with the same cable you use to charge iPhone 15 Pro. With USB 3, you get a huge leap in data transfer speeds. And you can download files up to 2x faster using Wi-Fi 6EVITAL SAFETY FEATURES  If your car breaks down when you are off the grid, you can get help with Roadside Assistance via satellite. And if you need emergency services and you dont have cell service or WiFi, you can use Emergency SOS via satellite.With Crash Detection, iPhone can detect a severe car crash and call for help if you cant.DESIGNED TO MAKE A DIFFERENCE  iPhone comes with privacy protections that help keep you in control of your data. It is made from more recycled materials to minimize environmental impact. And it has built in features that make iPhone more accessible to all.COMES WITH APPLECARE WARRANTY  Every iPhone comes with a one year limited warranty and up to 90 days of complimentary technical support. Get AppleCarePlus or AppleCare Plus with Theft and Loss to extend your coverage."
    },
    {
        "id": 14,
        "category": "iphone",
        "line": "15",
        "image": "assets/images/iphone/15/apple-iphone-15-pro-max-256gb-nano-sim-blue-titanium.jpg",
        "name": "Apple IPhone 15 Pro Max 256gb (nano-sim blue titanium)",
        "price": "1,890,090",
        "beforeprice": "2,100,100",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "iPhone 15 Pro Forged in titanium and features the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system FORGED IN TITANIUM  iPhone 15 Pro has a strong and light aerospace grade titanium design with a textured matte glass back. It also features a Ceramic Shield front that is tougher than any smartphone glass. And it is splash, water, and dust resistant.ADVANCED DISPLAY  The 6.1 Inches Super Retina XDR display with ProMotion ramps up refresh rates to 120Hz when you need exceptional graphics performance.Dynamic Island bubbles up alerts and Live Activities. Plus, with Always On display, your Lock Screen stays glanceable, so you dont have to tap it to stay in the know.GAME-CHANGING A17 PRO CHIP  A Pro-class GPU makes mobile games feel so immersive, with rich environments and realistic characters. A17 Pro is also incredibly efficient and helps to deliver amazing all day battery lifePOWERFUL PRO CAMERA SYSTEM  Get incredible framing flexibility with 7 pro lenses. Capture super high resolution photos with more color and detail using the 48MP Main camera. And take sharp close ups from far away with the 3x Telephoto camera on iPhone 15 ProCUSTOMIZABLE ACTION BUTTON  Action button is a fast track to your favorite feature. Just set the one you want, like Silent mode, Camera, Voice Memo, Shortcut, and more. Then press and hold to launch the action.PRO CONNECTIVITY  The new USB-C connector lets you charge your Mac or iPad with the same cable you use to charge iPhone 15 Pro. With USB 3, you get a huge leap in data transfer speeds. And you can download files up to 2x faster using Wi-Fi 6EVITAL SAFETY FEATURES  If your car breaks down when you are off the grid, you can get help with Roadside Assistance via satellite. And if you need emergency services and you dont have cell service or WiFi, you can use Emergency SOS via satellite.With Crash Detection, iPhone can detect a severe car crash and call for help if you cant.DESIGNED TO MAKE A DIFFERENCE  iPhone comes with privacy protections that help keep you in control of your data. It is made from more recycled materials to minimize environmental impact. And it has built in features that make iPhone more accessible to all.COMES WITH APPLECARE WARRANTY  Every iPhone comes with a one year limited warranty and up to 90 days of complimentary technical support. Get AppleCarePlus or AppleCare Plus with Theft and Loss to extend your coverage."
    },
    {
        "id": 15,
        "category": "iphone",
        "line": "15",
        "image": "assets/images/iphone/15/apple-iphone-15-pro-max-512gb-nano-sim-blue-titanium.jpg",
        "name": "Apple IPhone 15 Pro Max 512gb (blue-titanium)",
        "price": "1,877,490",
        "beforeprice": "2,086,100",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "iPhone 15 Pro Forged in titanium and features the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system FORGED IN TITANIUM  iPhone 15 Pro has a strong and light aerospace grade titanium design with a textured matte glass back. It also features a Ceramic Shield front that is tougher than any smartphone glass. And it is splash, water, and dust resistant.ADVANCED DISPLAY  The 6.1 Inches Super Retina XDR display with ProMotion ramps up refresh rates to 120Hz when you need exceptional graphics performance.Dynamic Island bubbles up alerts and Live Activities. Plus, with Always On display, your Lock Screen stays glanceable, so you dont have to tap it to stay in the know.GAME-CHANGING A17 PRO CHIP  A Pro-class GPU makes mobile games feel so immersive, with rich environments and realistic characters. A17 Pro is also incredibly efficient and helps to deliver amazing all day battery lifePOWERFUL PRO CAMERA SYSTEM  Get incredible framing flexibility with 7 pro lenses. Capture super high resolution photos with more color and detail using the 48MP Main camera. And take sharp close ups from far away with the 3x Telephoto camera on iPhone 15 ProCUSTOMIZABLE ACTION BUTTON  Action button is a fast track to your favorite feature. Just set the one you want, like Silent mode, Camera, Voice Memo, Shortcut, and more. Then press and hold to launch the action.PRO CONNECTIVITY  The new USB-C connector lets you charge your Mac or iPad with the same cable you use to charge iPhone 15 Pro. With USB 3, you get a huge leap in data transfer speeds. And you can download files up to 2x faster using Wi-Fi 6EVITAL SAFETY FEATURES  If your car breaks down when you are off the grid, you can get help with Roadside Assistance via satellite. And if you need emergency services and you dont have cell service or WiFi, you can use Emergency SOS via satellite.With Crash Detection, iPhone can detect a severe car crash and call for help if you cant.DESIGNED TO MAKE A DIFFERENCE  iPhone comes with privacy protections that help keep you in control of your data. It is made from more recycled materials to minimize environmental impact. And it has built in features that make iPhone more accessible to all.COMES WITH APPLECARE WARRANTY  Every iPhone comes with a one year limited warranty and up to 90 days of complimentary technical support. Get AppleCarePlus or AppleCare Plus with Theft and Loss to extend your coverage."
    },
    {
        "id": 16,
        "category": "iphone",
        "line": "15",
        "image": "assets/images/iphone/15/apple-iphone-15-pro-max-512gb-nano-sim-natural-titanium.jpg",
        "name": "Apple iphone 15 512gb (natural-titanium)",
        "price": "1,602,000",
        "beforeprice": "1,780,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "iPhone 15 Pro Forged in titanium and features the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system FORGED IN TITANIUM  iPhone 15 Pro has a strong and light aerospace grade titanium design with a textured matte glass back. It also features a Ceramic Shield front that is tougher than any smartphone glass. And it is splash, water, and dust resistant.ADVANCED DISPLAY  The 6.1 Inches Super Retina XDR display with ProMotion ramps up refresh rates to 120Hz when you need exceptional graphics performance.Dynamic Island bubbles up alerts and Live Activities. Plus, with Always On display, your Lock Screen stays glanceable, so you dont have to tap it to stay in the know.GAME-CHANGING A17 PRO CHIP  A Pro-class GPU makes mobile games feel so immersive, with rich environments and realistic characters. A17 Pro is also incredibly efficient and helps to deliver amazing all day battery lifePOWERFUL PRO CAMERA SYSTEM  Get incredible framing flexibility with 7 pro lenses. Capture super high resolution photos with more color and detail using the 48MP Main camera. And take sharp close ups from far away with the 3x Telephoto camera on iPhone 15 ProCUSTOMIZABLE ACTION BUTTON  Action button is a fast track to your favorite feature. Just set the one you want, like Silent mode, Camera, Voice Memo, Shortcut, and more. Then press and hold to launch the action.PRO CONNECTIVITY  The new USB-C connector lets you charge your Mac or iPad with the same cable you use to charge iPhone 15 Pro. With USB 3, you get a huge leap in data transfer speeds. And you can download files up to 2x faster using Wi-Fi 6EVITAL SAFETY FEATURES  If your car breaks down when you are off the grid, you can get help with Roadside Assistance via satellite. And if you need emergency services and you dont have cell service or WiFi, you can use Emergency SOS via satellite.With Crash Detection, iPhone can detect a severe car crash and call for help if you cant.DESIGNED TO MAKE A DIFFERENCE  iPhone comes with privacy protections that help keep you in control of your data. It is made from more recycled materials to minimize environmental impact. And it has built in features that make iPhone more accessible to all.COMES WITH APPLECARE WARRANTY  Every iPhone comes with a one year limited warranty and up to 90 days of complimentary technical support. Get AppleCarePlus or AppleCare Plus with Theft and Loss to extend your coverage."
    },
    {
        "id": 17,
        "category": "mac",
        "line": null,
        "image": "assets/images/mac/apple-13.6-macbook-air-m2-midnight-8gb-512gb.jpg",
        "name": "Macbook Air 512gb",
        "price": "450,000",
        "beforeprice": "500,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "MacBook Air now features the Apple M2 chip, which has many improvements over its predecessor, the M1. The Apple M2 integrates the CPU, GPU, Neural Engine, I/O, and more into a single system on a chip (SoC), this time utilizing 2nd-Gen 5nm process technology. Tackle your projects with the fast 8-Core CPU and take on graphics-intensive apps and games with the 10-core GPU. Accelerate machine learning tasks with the 16-core Neural Engine. The M2 also features 100 GB/s memory bandwidth. The M2 was also designed to speed up video workflows by adding a next-gen media engine and a powerful ProRes video engine for hardware-accelerated encode and decode. This means the M2 can play back more streams of 4K and 8K video. Complete with a silent, fanless design and up to 18 hours of battery life, the MacBook Air is still portable, but now a lot more powerful. It also has 8GB of unified RAM and a 512GB SSD.The MacBook Air also got a larger screen. It now features the 13.6"
    },
    {
        "id": 18,
        "category": "mac",
        "line": null,
        "image": "assets/images/mac/2024 OSX SONOMA- 2018 MACBOOK AIR 13 - 1.6GHz i5 - 16GB RAM - 256GB SSD - GRAY.webp",
        "name": "Macbook AIR 13 256gb (grey)",
        "price": "1,890,090",
        "beforeprice": "2,100,100",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Apple M2 ChipNow packed with 20 billion transistors, the Apple M2 integrates the CPU, GPU, Neural Engine, I/O, and more into a single system on a chip (SoC). The additional transistors, 25 percent more than the M1, improve the features of the chip, including the memory controller that can deliver up to 100 GB/s of unified memory bandwidth. The M2 has faster performance cores with a larger cache and the efficiency cores have been enhanced for more performance gains. Together, the M2 delivers up to 18 percent greater multithreaded performance than the M1 Liquid Retina DisplayThe MacBook Air now features Liquid Retina Display, with support for one billion colors. The 2560 x 1664 resolution provides crisp text. The 500 nits of brightness and wide P3 color gamut ensure that photos and movies are brilliant and vivid, complete with rich contrast and sharp detail.Compact DesignThe MacBook Air lives up to its name, weighing in at just 2.7 pounds and measuring just 0.44"
    },
    {
        "id": 19,
        "category": "mac",
        "line": null,
        "image": "assets/images/mac/apple-macbook-air-13-inch-2022-m2-8gb-256gb-ssd-8-core-gpu-space-gray.jpg",
        "name": " Apple Macbook Air 13 256gb (gray)",
        "price": "1,602,000",
        "beforeprice": "1,780,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Apple M2 ChipNow packed with 20 billion transistors, the Apple M2 integrates the CPU, GPU, Neural Engine, I/O, and more into a single system on a chip (SoC). The additional transistors, 25 percent more than the M1, improve the features of the chip, including the memory controller that can deliver up to 100 GB/s of unified memory bandwidth. The M2 has faster performance cores with a larger cache and the efficiency cores have been enhanced for more performance gains. Together, the M2 delivers up to 18 percent greater multithreaded performance than the M1.13.6"
    },
    {
        "id": 20,
        "category": "mac",
        "line": null,
        "image": "assets/images/mac/apple-macbook-pro-16.2-32gb-1tb-10-cores-m1-max-silver.jpg",
        "name": "Apple MacBook Pro 32gbRAM 1tbROM (10-cores, silver)",
        "price": "1,602,000",
        "beforeprice": "1,780,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "MacBook Pro is the ultimate pro mobile workstation for the ultimate user.The system features the Apple M3 Pro 12-Core Chip, which provides the power and performance efficiency needed to handle all your professional workflows. Now built on 3nm process technology, the M3 Pro 12-Core Chip is combined with a 18-Core GPU. The next-gen GPU features Dynamic Caching, hardware-accelerated ray tracing, and mesh shading, all of which significantly increase performance for the most demanding pro apps and games.The Liquid Retina XDR display features a 3024 x 1964 resolution, 1000 nits of sustained brightness, 1600 nits of peak brightness, P3 color gamut support, and more. With 18GB of unified RAM and 1TB of SSD storage, you'll be able to loadmassive files and launch apps quickly, enabling you to work with photo and video libraries from almost anywhere.Designed for All Types of CreativesApple M3 Pro 12-CorePacked with 37 billion transistors, the Apple M3 Pro integrates the CPU, GPU, Neural Engine, I/O, and more into a single system on a chip (SoC). Now built with 3nm process technology, the Apple M3 Pro delivers the performance you need without sacrificing power efficiency. The 12-Core CPU features six performance cores and six efficiency cores. The enhanced 16-Core Neural Engine accelerates powerful machine learning models, making AI/ML workflows even faster while keeping data on device to preserve privacy. The M3 Pro offers support for up to 36GB of unified memory With an 18-Core GPU, the M3 Pro features Dynamic Caching, which allocates the use of local memory in hardware in real time. Dynamic Caching only uses the exact amount of memory needed for each task, which dramatically increases the average utilization of the GPU, resulting in significant performance increases for the most demanding pro apps and games."
    },
    {
        "id": 21,
        "category": "ipad",
        "line": null,
        "image": "assets/images/ipad/apple-ipad-9th-gen-10.2-wi-fi-cellular-256gb-space-grey.jpg",
        "name": "Apple IPad 256gb (grey)",
        "price": "1,485,000",
        "beforeprice": "1,650,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Meet the redesigned iPad.The all-new iPad is colorfully reimagined to be more capable, more intuitive, and even more fun. With a new all‑screen design, 10.9-inch Liquid Retina display, and four gorgeous colors, iPad delivers a powerful way to get things done, create, and stay connected.1 Add on essential accessories designed just for iPad and enjoy endless versatility for everything you love to do. Draw, paint, and write with Apple Pencil. Type comfortably, use a trackpad, and enjoy content with the versatile two-piece design of the Magic Keyboard Folio.2 You can use familiar keyboard shortcuts or the click-anywhere trackpad. And get an incredible typing experience. iPadOS brings it all together and makes everything on iPad feel smooth and easy. Run your favorite apps side by side, edit and share photos with others, and get to all your files.Make quick work of your work. Get things done — all on one device. Take notes, collaborate, and work seamlessly between apps. From pie charts to pie recipes, iPad is designed for all kinds of productivity. The A14 Bionic chip delivers power and performance for any activity. Edit a 4K video in iMovie, plan a globe-trotting vacation with friends, or play a graphics-intensive game. With all-day battery life, you can do it all without skipping a beat. Edit a spreadsheet, finesse a Keynote presentation, and take amazing notes. The Magic Keyboard Folio gives you a comfortable typing experience and a trackpad for precise tasks."
    },
    {
        "id": 22,
        "category": "ipad",
        "line": null,
        "image": "assets/images/ipad/Apple-IPad-Pro-12.9-M2-2022 Model-Wi-Fi-Only-128GB-Silver.jpg",
        "name": "Apple IPad 128gb (silver)",
        "price": "1,895,100",
        "beforeprice": "2,100,100",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "IPad Pro 12.9  M2 (2022 Model) Wi-Fi + Cellular - 128 Supercharged by M2. Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity. Next-level Apple Pencil capabilities. Powerful new features in iPadOS 16. The ultimate iPad experience.The M2 chip is the next generation of Apple silicon, with an 8‑core CPU that delivers up to 15 percent faster performance and a 10‑core GPU that provides up to 35 percent faster graphics performance. With a 40 percent faster Neural Engine to accelerate machine learning tasks and 50 percent more memory bandwidth, M2 brings astonishing performance and new capabilities to iPad Pro. So you can create photorealistic 3D designs, build intricate AR models, and play games with console‑quality graphics at high frame rates faster than ever. All while enjoying all‑day battery life.The high-performance media engine on M2 accelerates ProRes encode and decode. You can convert video projects to ProRes up to 3x faster than before. And with the image signal processor in M2 and advanced cameras on "
    },
    {
        "id": 23,
        "category": "ipad",
        "line": null,
        "image": "assets/images/ipad/apple-ipad-pro-12.9-m22022-modelwi-ficellular-512gb-space-gray.jpg",
        "name": "Apple Ipad 512gb (gray)",
        "price": "1,602,000",
        "beforeprice": "1,780,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Meet the redesigned iPad.The all-new iPad is colorfully reimagined to be more capable, more intuitive, and even more fun. With a new all‑screen design, 10.9-inch Liquid Retina display, and four gorgeous colors, iPad delivers a powerful way to get things done, create, and stay connected.1 Add on essential accessories designed just for iPad and enjoy endless versatility for everything you love to do. Draw, paint, and write with Apple Pencil. Type comfortably, use a trackpad, and enjoy content with the versatile two-piece design of the Magic Keyboard Folio.2 You can use familiar keyboard shortcuts or the click-anywhere trackpad. And get an incredible typing experience. iPadOS brings it all together and makes everything on iPad feel smooth and easy. Run your favorite apps side by side, edit and share photos with others, and get to all your files.Make quick work of your work. Get things done — all on one device. Take notes, collaborate, and work seamlessly between apps. From pie charts to pie recipes, iPad is designed for all kinds of productivity. The A14 Bionic chip delivers power and performance for any activity. Edit a 4K video in iMovie, plan a globe-trotting vacation with friends, or play a graphics-intensive game. With all-day battery life, you can do it all without skipping a beat. Edit a spreadsheet, finesse a Keynote presentation, and take amazing notes. The Magic Keyboard Folio gives you a comfortable typing experience and a trackpad for precise tasks."
    },
    {
        "id": 24,
        "category": "ipad",
        "line": null,
        "image": "assets/images/ipad/apple-ipad-9th-gen-10.2-wi-fi-cellular-256gb-space-grey.jpg",
        "name": "Apple ipad 256gb (gray)",
        "price": "4,386,780",
        "beforeprice": "4,874,200",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Meet the redesigned iPad.The all-new iPad is colorfully reimagined to be more capable, more intuitive, and even more fun. With a new all‑screen design, 10.9-inch Liquid Retina display, and four gorgeous colors, iPad delivers a powerful way to get things done, create, and stay connected.1 Add on essential accessories designed just for iPad and enjoy endless versatility for everything you love to do. Draw, paint, and write with Apple Pencil. Type comfortably, use a trackpad, and enjoy content with the versatile two-piece design of the Magic Keyboard Folio.2 You can use familiar keyboard shortcuts or the click-anywhere trackpad. And get an incredible typing experience. iPadOS brings it all together and makes everything on iPad feel smooth and easy. Run your favorite apps side by side, edit and share photos with others, and get to all your files.Make quick work of your work. Get things done — all on one device. Take notes, collaborate, and work seamlessly between apps. From pie charts to pie recipes, iPad is designed for all kinds of productivity. The A14 Bionic chip delivers power and performance for any activity. Edit a 4K video in iMovie, plan a globe-trotting vacation with friends, or play a graphics-intensive game. With all-day battery life, you can do it all without skipping a beat. Edit a spreadsheet, finesse a Keynote presentation, and take amazing notes. The Magic Keyboard Folio gives you a comfortable typing experience and a trackpad for precise tasks."
    },
    {
        "id": 25,
        "category": "accessories",
        "line": "adapter",
        "image": "assets/images/accessories/adapter/apple-30w-usb-c-power-adapter.webp",
        "name": "Apple-30w USB Adapter (white)",
        "price": "36,000",
        "beforeprice": "40,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "The Apple 30W USB‑C Power Adapter offers fast, efficient charging at home, in the office, or on the go. While the power adapter is compatible with any USB‑C–enabled device, Apple recommends pairing it with the 13-inch MacBook Air with Retina display for optimal charging performance. You can also pair it with select iPhone and iPad Pro models to take advantage of the fast-charging feature.Charging cable sold separately."
    },
    {
        "id": 26,
        "category": "accessories",
        "line": "adapter",
        "image": "assets/images/accessories/adapter/apple-magsafe-2-power-adapter-60w.webp",
        "name": "Apple magsafe adapter 60w (white)",
        "price": "76,000",
        "beforeprice": "80,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "The Apple 60W USB‑C Power Adapter offers fast, efficient charging at home, in the office, or on the go. While the power adapter is compatible with any USB‑C–enabled device, Apple recommends pairing it with the 13-inch MacBook Air with Retina display for optimal charging performance. You can also pair it with select iPhone and iPad Pro models to take advantage of the fast-charging feature.Charging cable sold separately."
    },
    {
        "id": 27,
        "category": "accessories",
        "line": "adapter",
        "image": "assets/images/accessories/adapter/apple-magsafe-power-adapter-85w.webp",
        "name": "Apple magsafe adapter 85w (white)",
        "price": "81,000",
        "beforeprice": "90,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "The Apple 85W USB‑C Power Adapter offers fast, efficient charging at home, in the office, or on the go. While the power adapter is compatible with any USB‑C–enabled device, Apple recommends pairing it with the 13-inch MacBook Air with Retina display for optimal charging performance. You can also pair it with select iPhone and iPad Pro models to take advantage of the fast-charging feature.Charging cable sold separately."
    },
    {
        "id": 28,
        "category": "accessories",
        "line": "adapter",
        "image": "assets/images/accessories/adapter/apple-magsafe-2-power-adapter-60w.webp",
        "name": "Apple magsafe adapter 60w (white)",
        "price": "72,000",
        "beforeprice": "80,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "The Apple 30W USB‑C Power Adapter offers fast, efficient charging at home, in the office, or on the go. While the power adapter is compatible with any USB‑C–enabled device, Apple recommends pairing it with the 13-inch MacBook Air with Retina display for optimal charging performance. You can also pair it with select iPhone and iPad Pro models to take advantage of the fast-charging feature.Charging cable sold separately."
    },
    {
        "id": 29,
        "category": "accessories",
        "line": "airpod",
        "image": "assets/images/accessories/airpod/airpods-3rd-gen.webp",
        "name": "Airpod 3rd Generation (white)",
        "price": "315,000",
        "beforeprice": "350,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "AirPods. It’s magic, remastered Introducing the all-new AirPods. Featuring spatial audio that places sound all around you, Adaptive EQ that tunes music to your ears, and longer battery life. It’s all sweat and water resistant and delivers an experience that’s simply magical.All-new with Spatial Audio with spatial audio that places sound all around you Spatial audio with dynamic head tracking places sounds all around you to create a three-dimensional listening experience for music, TV shows, movies, and more — immersing you in sounds from every direction so it feels like you’re in your very own concert hall or theater.¹"
    },
    {
        "id": 30,
        "category": "accessories",
        "line": "airpod",
        "image": "assets/images/accessories/airpod/airpods-max-grey.webp",
        "name": "Airpod max (grey)",
        "price": "175,000",
        "beforeprice": "195,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "AirPods Max reimagine over-ear headphones. An Apple-designed dynamic driver provides immersive high-fidelity audio. Every detail, from canopy to cushions, has been designed for an exceptional fit. Industry-leading Active Noise Cancellation blocks outside noise, while Transparency mode lets it in."
    },
    {
        "id": 31,
        "category": "accessories",
        "line": "airpod",
        "image": "assets/images/accessories/airpod/airpods-with-charging-case-gen-2.webp",
        "name": "Airpod-with-charging-case (white)",
        "price": "175,000",
        "beforeprice": "195,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "AirPods Max reimagine over-ear headphones. An Apple-designed dynamic driver provides immersive high-fidelity audio. Every detail, from canopy to cushions, has been designed for an exceptional fit. Industry-leading Active Noise Cancellation blocks outside noise, while Transparency mode lets it in."
    },
    {
        "id": 32,
        "category": "accessories",
        "line": "airpod",
        "image": "assets/images/accessories/adapter/apple-30w-usb-c-power-adapter.webp",
        "name": "Apple-30w USB Adapter (white)",
        "price": "36,000",
        "beforeprice": "40,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "The Apple 30W USB‑C Power Adapter offers fast, efficient charging at home, in the office, or on the go. While the power adapter is compatible with any USB‑C–enabled device, Apple recommends pairing it with the 13-inch MacBook Air with Retina display for optimal charging performance. You can also pair it with select iPhone and iPad Pro models to take advantage of the fast-charging feature.Charging cable sold separately."
    },
    {
        "id": 33,
        "category": "accessories",
        "line": "cable",
        "image": "assets/images/accessories/cable/lightning-to-usb-c-cable-2-m.webp",
        "name": "Apple lightning to USB (white)",
        "price": "25,200",
        "beforeprice": "28,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Connect your iPhone, iPad, or iPod with Lightning connector to your USB-C or Thunderbolt 3 (USB-C) enabled Mac and iPad Pro for syncing and charging.You can also use this cable with your Apple 29W, 30W, 61W, or 87W USB-C Power Adapter to charge your iOS device, and even take advantage of the fast-charging feature on select iPhone and iPad Pro models."
    },
    {
        "id": 34,
        "category": "accessories",
        "line": "cable",
        "image": "assets/images/accessories/cable/lightning-to-usb-cable-1m-zml.webp",
        "name": "USB Charge-cable 1m (white)",
        "price": "47,250",
        "beforeprice": "52,500",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Connect your iPhone, iPad, or iPod with Lightning connector to your USB-C or Thunderbolt 3 (USB-C) enabled Mac and iPad Pro for syncing and charging.You can also use this cable with your Apple 29W, 30W, 61W, or 87W USB-C Power Adapter to charge your iOS device, and even take advantage of the fast-charging feature on select iPhone and iPad Pro models."
    },
    {
        "id": 35,
        "category": "accessories",
        "line": "cable",
        "image": "assets/images/accessories/cable/lightning-to-usb-cable-2-m.webp",
        "name": "USB Charge-cable 2m (white)",
        "price": "58,500",
        "beforeprice": "65,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Connect your iPhone, iPad, or iPod with Lightning connector to your USB-C or Thunderbolt 3 (USB-C) enabled Mac and iPad Pro for syncing and charging.You can also use this cable with your Apple 29W, 30W, 61W, or 87W USB-C Power Adapter to charge your iOS device, and even take advantage of the fast-charging feature on select iPhone and iPad Pro models."
    },
    {
        "id": 36,
        "category": "accessories",
        "line": "cable",
        "image": "assets/images/accessories/cable/lightning-to-usb-c-cable-2-m.webp",
        "name": "USB Charge-cable 2m (white)",
        "price": "58,500",
        "beforeprice": "65,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Connect your iPhone, iPad, or iPod with Lightning connector to your USB-C or Thunderbolt 3 (USB-C) enabled Mac and iPad Pro for syncing and charging.You can also use this cable with your Apple 29W, 30W, 61W, or 87W USB-C Power Adapter to charge your iOS device, and even take advantage of the fast-charging feature on select iPhone and iPad Pro models."
    },
    {
        "id": 37,
        "category": "accessories",
        "line": "protection",
        "image": "assets/images/accessories/protection/apple-iphone-15-pro-max-finewoven-case-with-magsafe-taupe.webp",
        "name": "Magsafe protection case (Brown)",
        "price": "34,200",
        "beforeprice": "38,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Thin, light, and easy to grip — this Apple-designed case shows off the brilliant colored finish of iPhone 15 Pro while providing extra protection. Crafted with a blend of optically clear polycarbonate and flexible materials, the case fits right over..."
    },
    {
        "id": 38,
        "category": "accessories",
        "line": "protection",
        "image": "assets/images/accessories/protection/iphone-13-13-pro-tempered-glass-full-coverage-screen.webp",
        "name": "iphone 13 screen protection (glass full)",
        "price": "54,000",
        "beforeprice": "60,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "iPhone 13 Pro Clear Screen Protector Maximum Protection: Specially designed curved edges protect your precious iPhone from dust and edge damage. The tempered glass provides full coverage for the front of your new iPhone 13"
    },
    {
        "id": 39,
        "category": "accessories",
        "line": "protection",
        "image": "assets/images/accessories/protection/iphone-14-clear-case-with-magsafe.webp",
        "name": "iphone 14 case (white)",
        "price": "72,000",
        "beforeprice": "80,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Thin, light, and easy to grip — this Apple-designed case shows off the brilliant colored finish of iPhone 14 Pro Max while providing extra protection. Crafted with a blend of optically clear polycarbonate and flexible materials, the case fits right over the buttons for easy use."
    },
    {
        "id": 40,
        "category": "accessories",
        "line": "protection",
        "image": "assets/images/accessories/protection/iphone-15-pro-max-clear-case-with-magsafe.webp",
        "name": "iphone 15 max case(gray)",
        "price": "81,000",
        "beforeprice": "90,000",
        "discountprice": "-10%",
        "quantity": 20,
        "description": "Thin, light, and easy to grip — this Apple-designed case shows off the brilliant colored finish of iPhone 14 Pro Max while providing extra protection. Crafted with a blend of optically clear polycarbonate and flexible materials, the case fits right over the buttons for easy use."
    }
];

// Page-depth prefix, e.g. pages/Products/iphone.html -> '../../' so that
// root-anchored asset paths resolve from any page in the site.
function storeRootPrefix() {
    const depth = window.location.pathname.split('/').filter(Boolean).length - 1;
    return '../'.repeat(Math.max(0, depth));
}

// Resolve a catalog image path for the current page. Absolute URLs,
// site-root paths and data URIs pass through untouched.
function storeImg(path) {
    if (!path) return path;
    if (/^(https?:|data:|\/|blob:)/.test(path)) return path;
    const rooted = String(path).replace(/^(?:\.\.\/)+/, '');
    return storeRootPrefix() + rooted;
}

// Seed the editable store copy once. Never overwrites: admin edits win.
const STORE_SCHEMA = 'v1';
// Write the built-in catalog into local storage on first run.
function seedStoreProducts() {
    if (localStorage.getItem('ihub_store_schema') === STORE_SCHEMA) return;
    try {
        localStorage.setItem('products', JSON.stringify(STORE_PRODUCTS));
        localStorage.setItem('ihub_store_schema', STORE_SCHEMA);
    } catch (e) { }
}

// Coerce a product's inventory count: whole numbers only; a missing count
// (legacy data written before the store schema) falls back to the seed
// baseline of 20 so it does not read as sold out.
function normalizeStoreProduct(product) {
    if (!product || typeof product !== 'object') return product;
    const quantity = Number(product.quantity);
    const normalized = Number.isFinite(quantity)
        ? Math.max(0, Math.floor(quantity))
        : 20;
    return { ...product, quantity: normalized };
}

// The working catalog: admin-edited products when present, canonical data
// otherwise. Always an array.
function getStoreCatalog() {
    seedStoreProducts();
    try {
        const stored = JSON.parse(localStorage.getItem('products'));
        if (Array.isArray(stored) && stored.length) return stored.map(normalizeStoreProduct);
    } catch (e) { /* fall through to canonical data */ }
    return STORE_PRODUCTS.map(normalizeStoreProduct);
}

// Find one product by id in the working catalog.
function findStoreProduct(id) {
    const catalog = getStoreCatalog();
    return catalog.find(p => p && p.id == id);
}

// Delivery coverage: pickup and door-delivery fees (naira) plus pickup ETA
// days for each supported city. One table serves the product page, checkout
// and the receipt.
const STORE_DELIVERY_RATES = {
    Lagos: { pickup: 640, door: 1110, minDays: 1, maxDays: 2 },
    Ibadan: { pickup: 950, door: 1550, minDays: 2, maxDays: 3 },
    Abeokuta: { pickup: 950, door: 1550, minDays: 2, maxDays: 3 },
    Abuja: { pickup: 1200, door: 2100, minDays: 2, maxDays: 4 },
    "Port Harcourt": { pickup: 1350, door: 2400, minDays: 3, maxDays: 5 },
    "Benin City": { pickup: 1200, door: 2100, minDays: 3, maxDays: 5 },
    Enugu: { pickup: 1350, door: 2400, minDays: 3, maxDays: 5 },
    Kano: { pickup: 1500, door: 2800, minDays: 4, maxDays: 7 },
};

// One city's delivery settings; unsupported cities fall back to Lagos.
function getDeliveryRate(city) {
    return STORE_DELIVERY_RATES[city] || STORE_DELIVERY_RATES.Lagos;
}

// Deduct purchased units from the working catalog so stock reflects orders.
// Called after an order is saved (card or pay on delivery). Products were
// deleted by the admin meanwhile are skipped; admin edits still win.
function reduceStockForProducts(cartItems) {
    const items = (Array.isArray(cartItems) ? cartItems : []).filter(
        (item) => item && item.id !== undefined && Number(item.quantity) > 0,
    );
    if (!items.length) return false;
    const next = getStoreCatalog().map((product) => {
        const match = items.find((item) => String(item.id) === String(product.id));
        if (!match) return product;
        const remaining = Math.max(0, Number(product.quantity) - Number(match.quantity));
        if (remaining === Number(product.quantity)) return product;
        return { ...product, quantity: remaining };
    });
    try {
        localStorage.setItem('products', JSON.stringify(next));
        return true;
    } catch (e) {
        /* keep the old stock when storage refuses the write */
        return false;
    }
}

// Shared toast notifications with success, info and error variants:
//   showToast("Saved!", "success")
//   showToast("Almost done.", "info")
//   showToast("Something went wrong.", "error")
// Uses Toastify when the page includes it; other pages get a plain fallback
// banner so no user feedback is lost.
function showToast(text, kind = "info", duration = 3000) {
    const palette = {
        success: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
        info: { background: "linear-gradient(to right, #171b13, #38402f)" },
        error: { background: "linear-gradient(to right, #c62828, #d50000)" },
    };
    const style = palette[kind] || palette.info;
    if (window.Toastify) {
        window.Toastify({
            text: text,
            duration: duration,
            gravity: "top",
            position: "left",
            style: style,
        }).showToast();
        return;
    }
    const toast = document.createElement("div");
    toast.className = "ihub-toast ihub-toast--" + (palette[kind] ? kind : "info");
    toast.textContent = text;
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), duration);
}

// Per-user message inbox. Each account owns its own message list, keyed by email
function userMessageKey(email) {
    const id = (typeof email === 'string' && email.trim()) ? email.trim().toLowerCase() : '';
    return id ? 'messages:' + id : 'messages:guest';
}

// Canonical shape for one inbox message:
// { id, subject, body, sender, read, createdAt }
// Writers may pass loose objects; readers always see these keys.
function normalizeUserMessage(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const at = Number(raw.id);
    const createdAt = raw.createdAt ?? (Number.isFinite(at) && at > 0 ? at : null);
    return {
        id: raw.id ?? Date.now(),
        subject: (typeof raw.subject === 'string' && raw.subject.trim()) ? raw.subject : 'Message from iHub',
        body: typeof raw.body === 'string' ? raw.body : '',
        sender: raw.sender || 'iHub',
        read: raw.read === true,
        createdAt: createdAt,
    };
}

// Read one user's inbox messages from storage, normalized.
function getUserMessages(email) {
    let own = [];
    try {
        const stored = JSON.parse(localStorage.getItem(userMessageKey(email)));
        if (Array.isArray(stored)) own = stored;
    } catch (e) { own = []; }
    // Normalize on read so the UI always gets the same keys.
    return own.map(normalizeUserMessage).filter(Boolean);
}

// Save one user's inbox messages to storage.
function setUserMessages(email, list) {
    localStorage.setItem(userMessageKey(email), JSON.stringify(list || []));
}

// Append one message to an account's inbox. New messages start unread.
function storeUserMessage(email, message) {
    const item = normalizeUserMessage(message);
    if (!item) return;
    item.createdAt = Date.now();
    item.read = false;
    const list = getUserMessages(email);
    list.push(item);
    setUserMessages(email, list);
}
