class Viewer {
  #mode = "video";
  #pictureInPicture = false;
  #speed = 1;
  constructor(keyboardShortcuts = false, playWhenLoaded = false) {
    var viewer_ = this;
    this.initialized = false;
    this.viewer = document.querySelector("div.viewer");
    this.waitforclick = this.viewer.querySelector("div.waitforclick");
    this.full_languages_name = {
      abk: "Abkhazian",
      ace: "Achinese",
      ach: "Acoli",
      ada: "Adangme",
      ady: "Adyghe; Adygei",
      aar: "Afar",
      afh: "Afrihili",
      afr: "Afrikaans",
      afa: "Afro-Asiatic",
      aka: "Akan",
      akk: "Akkadian",
      alb: "Albanian",
      sqi: "Albanian",
      ale: "Aleut",
      alg: "Algonquian",
      amh: "Amharic",
      apa: "Apache",
      ara: "Arabic",
      arg: "Aragonese",
      arc: "Aramaic",
      arp: "Arapaho",
      arn: "Araucanian",
      arw: "Arawak",
      arm: "Armenian",
      hye: "Armenian",
      asm: "Assamese",
      ast: "Asturian; Bable",
      ath: "Athapascan",
      aus: "Australian",
      map: "Austronesian",
      ava: "Avaric",
      ave: "Avestan",
      awa: "Awadhi",
      aym: "Aymara",
      aze: "Azerbaijani",
      ban: "Balinese",
      bal: "Baluchi",
      bam: "Bambara",
      bai: "Bamileke",
      bad: "Banda",
      bar: "Bavarian",
      bnt: "Bantu",
      bas: "Basa",
      bak: "Bashkir",
      baq: "Basque",
      eus: "Basque",
      btk: "Batak",
      bej: "Beja",
      bel: "Belarusian",
      bem: "Bemba",
      ben: "Bengali",
      ber: "Berber",
      bho: "Bhojpuri",
      bih: "Bihari",
      bik: "Bikol",
      bin: "Bini",
      bis: "Bislama",
      bjz: "Baruga",
      byn: "Blin",
      nob: "Norwegian",
      bos: "Bosnian",
      bra: "Braj",
      bre: "Breton",
      bug: "Buginese",
      bul: "Bulgarian",
      bua: "Buriat",
      bur: "Burmese",
      mya: "Burmese",
      cad: "Caddo",
      car: "Carib",
      spa: "Spanish",
      cat: "Valencian",
      ceb: "Cebuano",
      cel: "Celtic",
      cai: "Central American Indian",
      chg: "Chagatai",
      cmc: "Chamic",
      cha: "Chamorro",
      che: "Chechen",
      chr: "Cherokee",
      chy: "Cheyenne",
      chb: "Chibcha",
      nya: "Nyanja; Chichewa; Chewa",
      chi: "Chinese",
      zho: "Chinese",
      chn: "Chinook jargon",
      chp: "Chipewyan",
      cho: "Choctaw",
      zha: "Zhuang; Chuang",
      chk: "Chuukese",
      chv: "Chuvash",
      nwc: "Old Newari; Classical Newari; Classical Nepal Bhasa",
      cmn: "Mandarin Chinese",
      cop: "Coptic",
      cor: "Cornish",
      cos: "Corsican",
      cre: "Cree",
      mus: "Creek",
      crp: "Creoles and pidgins",
      cpe: "Creoles and pidgins, English-based",
      cpf: "Creoles and pidgins, French-based",
      cpp: "Creoles and pidgins, Portuguese-based",
      crh: "Crimean Tatar; Crimean Turkish",
      scr: "Croatian",
      hrv: "Croatian",
      cus: "Cushitic",
      cze: "Czech",
      ces: "Czech",
      dak: "Dakota",
      dan: "Danish",
      dar: "Dargwa",
      day: "Dayak",
      del: "Delaware",
      din: "Dinka",
      div: "Divehi",
      doi: "Dogri",
      dgr: "Dogrib",
      dra: "Dravidian",
      dua: "Duala",
      dut: "Flemish; Dutch",
      nld: "Flemish; Dutch",
      dum: "Dutch",
      dyu: "Dyula",
      dzo: "Dzongkha",
      efi: "Efik",
      egy: "Egyptian",
      eka: "Ekajuk",
      elx: "Elamite",
      eng: "US English",
      enm: "English",
      ang: "English",
      myv: "Erzya",
      epo: "Esperanto",
      est: "Estonian",
      ewe: "Ewe",
      ewo: "Ewondo",
      fan: "Fang",
      fat: "Fanti",
      fao: "Faroese",
      fij: "Fijian",
      fil: "Pilipino; Filipino",
      fin: "Finnish",
      fiu: "Finno-Ugrian",
      fon: "Fon",
      fre: "French",
      fra: "French",
      frm: "French",
      fro: "French",
      fry: "Frisian",
      fur: "Friulian",
      ful: "Fulah",
      gaa: "Ga",
      gla: "Scottish Gaelic; Gaelic",
      glg: "Gallegan",
      lug: "Ganda",
      gay: "Gayo",
      gba: "Gbaya",
      gez: "Geez",
      geo: "Georgian",
      kat: "Georgian",
      ger: "German",
      deu: "Deutsch",
      nds: "Saxon, Low; German, Low; Low Saxon; Low German",
      gmh: "German",
      goh: "German",
      gem: "Germanic",
      kik: "Kikuyu; Gikuyu",
      gil: "Gilbertese",
      gon: "Gondi",
      gor: "Gorontalo",
      got: "Gothic",
      grb: "Grebo",
      grc: "Greek",
      gre: "Greek",
      ell: "Greek",
      kal: "Kalaallisut; Greenlandic",
      grn: "Guarani",
      guj: "Gujarati",
      gwi: "Gwich’in",
      hai: "Haida",
      hat: "Haitian Creole; Haitian",
      hau: "Hausa",
      haw: "Hawaiian",
      heb: "Hebrew",
      her: "Herero",
      hil: "Hiligaynon",
      him: "Himachali",
      hin: "Hindi",
      hmo: "Hiri Motu",
      hit: "Hittite",
      hmn: "Hmong",
      hun: "Hungarian",
      hup: "Hupa",
      iba: "Iban",
      ice: "Icelandic",
      isl: "Icelandic",
      ido: "Ido",
      ibo: "Igbo",
      ijo: "Ijo",
      ilo: "Iloko",
      smn: "Inari Sami",
      inc: "Indic",
      ine: "Indo-European",
      ind: "Indonesian",
      inh: "Ingush",
      ina: "Interlingua",
      ile: "Interlingue",
      iku: "Inuktitut",
      ipk: "Inupiaq",
      ira: "Iranian",
      gle: "Irish",
      mga: "Irish",
      sga: "Irish",
      iro: "Iroquoian",
      ita: "Italian",
      jpn: "Japanese",
      jav: "Javanese",
      jrb: "Judeo-Arabic",
      jpr: "Judeo-Persian",
      kbd: "Kabardian",
      kab: "Kabyle",
      kac: "Kachin",
      xal: "Kalmyk",
      kam: "Kamba",
      kan: "Kannada",
      kau: "Kanuri",
      krc: "Karachay-Balkar",
      kaa: "Kara-Kalpak",
      kar: "Karen",
      kas: "Kashmiri",
      csb: "Kashubian",
      kaw: "Kawi",
      kaz: "Kazakh",
      kha: "Khasi",
      khm: "Khmer",
      khi: "Khoisan",
      kho: "Khotanese",
      kmb: "Kimbundu",
      kin: "Kinyarwanda",
      kir: "Kirghiz",
      tlh: "Klingon",
      kom: "Komi",
      kon: "Kongo",
      kok: "Konkani",
      kor: "Korean",
      kos: "Kosraean",
      kpe: "Kpelle",
      kri: "Krio",
      kro: "Kru",
      kum: "Kumyk",
      kur: "Kurdish",
      kru: "Kurukh",
      kut: "Kutenai",
      kua: "Kwanyama, Kuanyama",
      lad: "Ladino",
      lah: "Lahnda",
      lam: "Lamba",
      lao: "Lao",
      lat: "Latin",
      lav: "Latvian",
      lez: "Lezghian",
      lim: "Limburgan; Limburger; Limburgish",
      lin: "Lingala",
      lit: "Lithuanian",
      jbo: "Lojban",
      dsb: "Lower Sorbian",
      loz: "Lozi",
      lub: "Luba-Katanga",
      lua: "Luba-Lulua",
      lui: "Luiseno",
      smj: "Lule Sami",
      lun: "Lunda",
      luo: "Luo",
      lus: "Lushai",
      ltz: "Luxembourgish; Letzeburgesch",
      mac: "Macedonian",
      mkd: "Macedonian",
      mad: "Madurese",
      mag: "Magahi",
      mai: "Maithili",
      mak: "Makasar",
      mlg: "Malagasy",
      may: "Malay",
      msa: "Malay",
      mal: "Malayalam",
      mlt: "Maltese",
      mnc: "Manchu",
      mdr: "Mandar",
      man: "Mandingo",
      mni: "Manipuri ",
      mno: "Manobo",
      glv: "Manx",
      mao: "Maori",
      mri: "Maori",
      mar: "Marathi",
      chm: "Mari",
      mah: "Marshallese",
      mwr: "Marwari",
      mas: "Masai",
      myn: "Mayan",
      mey: "Hassaniyya",
      men: "Mende",
      mic: "Micmac; Mi'kmaq",
      min: "Minangkabau",
      mwl: "Mirandese",
      moh: "Mohawk",
      mdf: "Moksha",
      mol: "Moldavian",
      mkh: "Mon-Khmer",
      lol: "Mongo",
      mon: "Mongolian",
      mos: "Mossi",
      mul: "Multiple",
      mun: "Munda",
      nah: "Nahuatl",
      nau: "Nauru",
      nav: "Navajo; Navaho",
      nde: "North Ndebele",
      nbl: "South Ndebele",
      ndo: "Ndonga",
      nap: "Neapolitan",
      new: "Nepal Bhasa; Newari",
      nep: "Nepali",
      nia: "Nias",
      nic: "Niger-Kordofanian",
      ssa: "Nilo-Saharan",
      niu: "Niuean",
      nog: "Nogai",
      non: "Norse",
      nai: "North American Indian",
      sme: "Northern Sami",
      nso: "Sotho, Northern; Pedi; Sepedi",
      nor: "Norwegian",
      nub: "Nubian",
      nym: "Nyamwezi",
      nyn: "Nyankole",
      nno: "Nynorsk, Norwegian; Norwegian Nynorsk",
      nyo: "Nyoro",
      nzi: "Nzima",
      oci: "Provençal; Occitan (post 1500) ",
      oji: "Ojibwa",
      chu: "Old Slavonic; Church Slavonic; Old Bulgarian; Church Slavic; Old Church Slavonic ",
      ori: "Oriya",
      orm: "Oromo",
      osa: "Osage",
      oss: "Ossetic; Ossetian",
      oto: "Otomian",
      pal: "Pahlavi",
      pau: "Palauan",
      pli: "Pali",
      pam: "Pampanga",
      pag: "Pangasinan",
      pan: "Punjabi; Panjabi",
      pap: "Papiamento",
      paa: "Papuan",
      per: "Persian",
      fas: "Persian",
      peo: "Persian",
      phn: "Phoenician",
      pon: "Pohnpeian",
      pol: "Polish",
      por: "Portuguese",
      pra: "Prakrit",
      pro: "Provençal",
      pus: "Pushto",
      que: "Quechua",
      roh: "Raeto-Romance",
      raj: "Rajasthani",
      rap: "Rapanui",
      rar: "Rarotongan",
      roa: "Romance",
      rum: "Romanian",
      ron: "Romanian",
      rom: "Romany",
      run: "Rundi",
      rus: "Russian",
      sal: "Salishan",
      sam: "Samaritan Aramaic",
      smi: "Sami",
      smo: "Samoan",
      sad: "Sandawe",
      sag: "Sango",
      san: "Sanskrit",
      sat: "Santali",
      srd: "Sardinian",
      sas: "Sasak",
      sco: "Scots",
      sel: "Selkup",
      sem: "Semitic",
      scc: "Serbian",
      srp: "Serbian",
      srr: "Serer",
      shn: "Shan",
      sna: "Shona",
      iii: "Sichuan Yi",
      scn: "Sicilian",
      sid: "Sidamo",
      sgn: "Sign",
      bla: "Siksika",
      snd: "Sindhi",
      sin: "Sinhalese; Sinhala",
      sit: "Sino-Tibetan",
      sio: "Siouan",
      sms: "Skolt Sami",
      den: "Slave",
      sla: "Slavic",
      slo: "Slovak",
      slk: "Slovak",
      slv: "Slovenian",
      sog: "Sogdian",
      som: "Somali",
      son: "Songhai",
      snk: "Soninke",
      wen: "Sorbian",
      sot: "Sotho, Southern",
      sai: "South American Indian",
      sma: "Southern Sami",
      suk: "Sukuma",
      sux: "Sumerian",
      sun: "Sundanese",
      sus: "Susu",
      swa: "Swahili",
      ssw: "Swati",
      swe: "Swedish",
      syr: "Syriac",
      tgl: "Tagalog",
      tah: "Tahitian",
      tai: "Tai",
      tgk: "Tajik",
      tmh: "Tamashek",
      tam: "Tamil",
      tat: "Tatar",
      tel: "Telugu",
      ter: "Tereno",
      tet: "Tetum",
      tha: "Thai",
      tib: "Tibetan",
      bod: "Tibetan",
      tig: "Tigre",
      tir: "Tigrinya",
      tem: "Timne",
      tiv: "Tiv",
      tli: "Tlingit",
      tpi: "Tok Pisin",
      tkl: "Tokelau",
      tog: "Tonga",
      ton: "Tonga",
      tsi: "Tsimshian",
      tso: "Tsonga",
      tsn: "Tswana",
      tum: "Tumbuka",
      tup: "Tupi",
      tur: "Turkish",
      ota: "Turkish",
      tuk: "Turkmen",
      tvl: "Tuvalu",
      tyv: "Tuvinian",
      twi: "Twi",
      udm: "Udmurt",
      uga: "Ugaritic",
      uig: "Uyghur; Uighur",
      ukr: "Ukrainian",
      umb: "Umbundu",
      hsb: "Upper Sorbian",
      urd: "Urdu",
      uzb: "Uzbek",
      vai: "Vai",
      ven: "Venda",
      vie: "Vietnamese",
      vol: "Volapük",
      vot: "Votic",
      wak: "Wakashan",
      wal: "Walamo",
      wln: "Walloon",
      war: "Waray",
      was: "Washo",
      wel: "Welsh",
      cym: "Welsh",
      wol: "Wolof",
      xho: "Xhosa",
      sah: "Yakut",
      yao: "Yao",
      yap: "Yapese",
      yid: "Yiddish",
      yor: "Yoruba",
      ypk: "Yupik",
      znd: "Zande",
      zap: "Zapotec",
      zen: "Zenaga",
      zul: "Zulu",
      zun: "Zuni",
    };
    this.reloadMenus = () => null;
    this.lyrics = null;

    this.videoElement = this.viewer.querySelector("div.players video");
    this.audioElement = this.viewer.querySelector(
      "div.players div.audio audio",
    );
    this.audioDiv = this.viewer.querySelector("div.players div.audio");
    this.fileName = this.viewer.querySelector("div.filename");
    this.imageElement = this.viewer.querySelector("div.players img");
    this.imageFakeVideo = document.createElement("video");
    this.iframeElement = this.viewer.querySelector("div.players iframe");

    if (window.location.host !== "") {
      this.iframeElement.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      );
    }

    this.players = this.viewer.querySelector("div.players").children;
    this.timeInput = this.viewer.querySelector("div.controls div.time input");
    this.timeInputPreview = {
      div: this.viewer.querySelector("div.controls div.time .preview"),
      span: this.viewer.querySelector("div.controls div.time .preview span"),
      video: this.viewer.querySelector("div.controls div.time .preview video"),
    };
    this.volumeInput = this.viewer.querySelector(
      "div.controls div.options div.volume input",
    );
    this.timeIndicators = {
      time: this.viewer.querySelector("div.controls div.time span.time"),
      total_time: this.viewer.querySelector(
        "div.controls div.time span.total-time",
      ),
    };

    this.controls = this.viewer.querySelector("div.controls");
    this.controls_picture_in_picture = this.viewer.querySelector(
      "div.controls div.options div.pip",
    );
    this.loop = "noloop";

    this.subtitles = document.querySelector(".subtitles");

    this.midiPlayer = {};

    this.playWhenLoaded = playWhenLoaded;

    this.videoElement.addEventListener("ended", function () {
      this.viewer
        .querySelector("div.controls div.playpause .play")
        .classList.remove("hidden");
      this.viewer
        .querySelector("div.controls div.playpause .pause")
        .classList.remove("hidden");
      this.viewer
        .querySelector("div.controls div.playpause .pause")
        .classList.add("hidden");
    });

    this.audioElement.addEventListener("ended", function () {
      this.viewer
        .querySelector("div.controls div.playpause .play")
        .classList.remove("hidden");
      this.viewer
        .querySelector("div.controls div.playpause .pause")
        .classList.remove("hidden");
      this.viewer
        .querySelector("div.controls div.playpause .pause")
        .classList.add("hidden");
    });

    this.loopOff();

    const addTBodyLine = (element, line) => {
      let tr = document.createElement("tr");
      var th = null;
      var i = 0;
      var j = 0;
      for (i = 0; i < line.length; i++) {
        th = document.createElement("th");
        th.innerHTML = line[i].content;
        for (j = 0; j < Object.keys(line[i]).length; j++) {
          if (Object.keys(line[i])[j] != "content") {
            th[Object.keys(line[i])[j]] = line[i][Object.keys(line[i])[j]];
          }
        }
        tr.appendChild(th);
      }
      element.appendChild(tr);
    };

    const setTBodyContent = (element, content) => {
      var i = 0;
      for (i = 0; i < content.length; i++) {
        addTBodyLine(element, content[i]);
      }
    };

    this.table = { addLine: addTBodyLine, setContent: setTBodyContent };

    function autoToggleControls(e) {
      const isDraggingSubtitles = () => {
        return (
          document.querySelector(".subtitles").getAttribute("align") ==
          "dragging"
        );
      };

      const isOverSubElement = (e) => {
        try {
          return getQueryOfElement(e.target).includes(".controls");
        } catch {
          return false;
        }
      };

      if (!isDraggingSubtitles() && !isOverSubElement(e)) {
        var fullscreen = 0;

        if (viewer_.fullscreen) {
          fullscreen = 100;
        }

        if (window.outerHeight - e.clientY <= 300 - fullscreen) {
          document.querySelector("div.controls").classList.remove("hidden");
          document.querySelector("div.subtitles").classList.add("up");
        } else {
          document.querySelector("div.controls").classList.add("hidden");
          document.querySelector("div.subtitles").classList.remove("up");
        }
      } else {
        /* document.querySelector('div.controls').classList.add('hidden');
        document.querySelector('div.subtitles').classList.remove('up'); */
      }
    }

    document.addEventListener("mousemove", autoToggleControls);
    document.addEventListener("mousedown", autoToggleControls);
    document.addEventListener("mouseup", autoToggleControls);

    if (keyboardShortcuts) {
      this.addKeyboardShortcuts();
    }

    this.dragElement(".subtitles");

    this.downloadVideoFrameCapture = () => {};

    this.tracks = {
      menus: {
        audio: document.querySelector(".audiotracks .popup .main select"),
        video: document.querySelector(".videotracks .popup .main select"),
      },
      buttons: {
        audio: this.controls.querySelector(".tracks-btns .audiotracksbtn"),
        video: this.controls.querySelector(".tracks-btns .videotracksbtn"),
      },
    };

    document.addEventListener("load", function () {
      const rm = () => {
        try {
          reloadMenus();
        } catch {}
      };

      this.videoElement.videoElement.onloadeddata = rm;
    });

    this.volumeInput.addEventListener("input", (event) => {
      viewer_.volume = Number(event.target.value) / 100;
    });

    this.controls.addEventListener("mousemove", (event) => {
      if (
        this.getQueryOfElement(event.target).includes(
          "div.controls div.time span.i",
        ) ||
        this.getQueryOfElement(event.target).includes(
          "div.controls div.time div.preview span.time",
        )
      ) {
        this.timeInputPreview.div.classList.remove("hidden");
      } else {
        this.timeInputPreview.div.classList.add("hidden");
      }
    });

    this.controls.addEventListener("mouseleave", (event) => {
      this.timeInputPreview.div.classList.add("hidden");
    });

    this.timeInput.isMouseDown = false;

    const round = (n, r = 1) => Math.round(n * (1 / r)) / (1 / r);

    this.timeInput.addEventListener("mousemove", (event) => {
      const fixCalculations = (n) => (n < 0 ? 0 : n);
      var input_rect = this.timeInput.getBoundingClientRect();
      var time_s = this.isMouseDown
        ? this.timeInput.value / this.timeInput.max
        : (fixCalculations(event.clientX - input_rect.x) / input_rect.width) *
          this.getElementOfMode().duration;
      this.timeInputPreview.video.currentTime = round(
        time_s,
        this.getElementOfMode().duration /
          (this.getElementOfMode().duration >= 3600
            ? 100
            : this.getElementOfMode().duration >= 1800
              ? 50
              : 20),
      );
      this.timeInputPreview.span.classList.add("hidden");
      this.timeInputPreview.div.style.left = event.clientX + "px";
    });

    this.timeInput.addEventListener("input", (event) => {
      var time_s =
        (this.timeInput.value / this.timeInput.max) *
        this.getElementOfMode().duration;
      var current_time = utils.s2hms(time_s);
      var time_str =
        this.getElementOfMode().duration >= 3600
          ? current_time
          : current_time.replace("00:", "");
      this.timeInputPreview.span.innerText = `${time_str}`;
      this.timeInputPreview.span.classList.remove("hidden");
      this.timeInputPreview.div.style.left = event.clientX + "px";
      this.timeInputPreview.video.currentTime = time_s;
    });

    this.timeInput.addEventListener("mousedown", (event) => {
      this.isMouseDown = true;
    });

    this.timeInput.addEventListener("mouseup", (event) => {
      this.isMouseDown = false;
    });

    this.volumeInput.addEventListener("change", (event) => {
      viewer_.volume = Number(event.target.value) / 100;
    });

    this.videoElement.addEventListener("play", async function () {
      while (!viewer_.isPaused()) {
        if (!viewer_.timeInput.matches(":active")) {
          viewer_.refreshTimeInput();
        }
        viewer_.refreshTimeIndicators();
        await utils.delay(0.00005);
      }
    });

    this.audioElement.addEventListener("play", async function () {
      while (!viewer_.isPaused()) {
        if (!viewer_.timeInput.matches(":active")) {
          viewer_.refreshTimeInput();
        }
        viewer_.refreshTimeIndicators();
        await utils.delay(0.00005);
      }
    });

    this.timeInput.addEventListener("change", function () {
      viewer_.refreshTimeIndicators();
    });

    this.initialized = true;
    this.onInitialization();
  }

  onInitialization() {
    if (new URLSearchParams(window.location.search).get("mode") === null) {
      this.mode = "video";
    }

    if (this.playWhenLoaded) {
      this.waitforclick.classList.remove("hidden");
      var viewer_ = this;
      function wfc(e) {
        e.preventDefault();
        if (viewer_.playWhenLoaded) viewer_.play();
        if (viewer_.isPaused()) return;
        viewer_.waitforclick.classList.add("hidden");
        document.removeEventListener("click", wfc);
        document.removeEventListener("mousemove", wfc);
        document.removeEventListener("keydown", wfc);
      }
      document.addEventListener("click", wfc);
      document.addEventListener("mousemove", wfc);
      document.addEventListener("keydown", wfc);
    }
  }

  // Keyboard shortcuts
  isKeyboardEventAltered(event) {
    return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
  }

  keyboardShortcuts(e, viewer) {
    const isKeyboardEventAltered = (event) => {
      return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    };

    const isSelectedElementAFeild = () => {
      return (
        document.activeElement.tagName == "INPUT" ||
        document.activeElement.tagName == "TEXTAREA"
      );
    };

    if (
      (e.key === "t") &
      !isKeyboardEventAltered(e) &
      !isSelectedElementAFeild()
    ) {
      e.preventDefault();
      viewer.openAudioTracksMenu();
    } else if ((e.key === "t") & e.shiftKey & !isSelectedElementAFeild()) {
      e.preventDefault();
      viewer.openVideoTracksMenu();
    } else if (
      (e.key === "i") &
      !isKeyboardEventAltered(e) &
      !isSelectedElementAFeild()
    ) {
      e.preventDefault();
      viewer.importFile();
    } else if (
      (e.key === "c") &
      !isKeyboardEventAltered(e) &
      !isSelectedElementAFeild()
    ) {
      e.preventDefault();
      viewer.takeCaptureOfVideoElementAtTime();
    } else if (e.key === "C" && e.shiftKey & !isSelectedElementAFeild()) {
      e.preventDefault();
      viewer.takeCaptureOfVideoElementAtTime(
        Number(
          viewer.hms2s(prompt(ui_translator.getDialogInLanguage("vfc_custom"))),
        ),
      );
    } else if (
      (e.key === "F11") &
        !isKeyboardEventAltered(e) &
        !isSelectedElementAFeild() ||
      (e.key === "f") & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()
    ) {
      e.preventDefault();
      viewer.toggleFullscreen();
    } else if (
      (e.key === "m") &
      !isKeyboardEventAltered(e) &
      !isSelectedElementAFeild()
    ) {
      e.preventDefault();
      viewer.toggleMute();
    } else if (
      (e.key === "l") &
      !isKeyboardEventAltered(e) &
      !isSelectedElementAFeild()
    ) {
      e.preventDefault();
      viewer.toggleLoop();
    } else if (
      (e.key === " ") &
      !isKeyboardEventAltered(e) &
      !isSelectedElementAFeild()
    ) {
      e.preventDefault();
      viewer.toggleLecture();
    } else if (
      (e.key === "ArrowLeft") &
      !isKeyboardEventAltered(e) &
      !isSelectedElementAFeild()
    ) {
      if (e.repeat) {
        e.preventDefault();
        viewer.goBackward2();
      } else {
        e.preventDefault();
        viewer.goBackward();
      }
    } else if (
      (e.key === "ArrowRight") &
      !isKeyboardEventAltered(e) &
      !isSelectedElementAFeild()
    ) {
      if (e.repeat) {
        e.preventDefault();
        viewer.goForeward2();
      } else {
        e.preventDefault();
        viewer.goForeward();
      }
    } else if (
      (e.key === "ArrowUp") &
      !isKeyboardEventAltered(e) &
      !isSelectedElementAFeild()
    ) {
      if (e.repeat) {
        e.preventDefault();
        viewer.volumeUp2();
      } else {
        e.preventDefault();
        viewer.volumeUp();
      }
    } else if (
      (e.key === "ArrowDown") &
      !isKeyboardEventAltered(e) &
      !isSelectedElementAFeild()
    ) {
      if (e.repeat) {
        e.preventDefault();
        viewer.volumeDown2();
      } else {
        e.preventDefault();
        viewer.volumeDown();
      }
    } else if (
      (e.keyCode === 219) &
      e.ctrlKey &
      e.shiftKey &
      !isSelectedElementAFeild()
    ) {
      e.preventDefault();
      viewer.togglePictureInPicture(); // new AppWindow().turnIntoApp("#settings-app");
    } else if ((e.key === "s") & e.ctrlKey & !isSelectedElementAFeild()) {
      e.preventDefault();
      windows.toggleAppVisibility("#settings-app");
    } else if ((e.key === "l") & e.ctrlKey & !isSelectedElementAFeild()) {
      e.preventDefault();
    }
  }

  addKeyboardShortcuts() {
    let viewer = this;
    document.addEventListener("keydown", (e) => {
      viewer.keyboardShortcuts(e, viewer);
    });
    this.timeInput.addEventListener("keydown", (e) => {
      viewer.keyboardShortcuts(e, viewer);
    });
  }

  removeKeyboardShortcuts() {
    let viewer = this;
    document.removeEventListener("keydown", (e) => {
      viewer.keyboardShortcuts(e, viewer);
    });
  }

  setOrientation(orientation) {
    if (orientation == "vertical") {
      this.videoElement.style.height =
        utils.getBrowserName() === "firefox"
          ? "-moz-available"
          : "-webkit-fill-available";
      this.videoElement.style.width = "";
      this.imageElement.style.height =
        utils.getBrowserName() === "firefox"
          ? "-moz-available"
          : "-webkit-fill-available";
      this.imageElement.style.width = "";
    } else if (orientation == "horizontal") {
      this.videoElement.style.height = "";
      this.videoElement.style.width =
        utils.getBrowserName() === "firefox"
          ? "-moz-available"
          : "-webkit-fill-available";
      this.imageElement.style.height = "";
      this.imageElement.style.width =
        utils.getBrowserName() === "firefox"
          ? "-moz-available"
          : "-webkit-fill-available";
    }
  }

  getSource() {
    switch (this.mode) {
      case "video":
        return this.videoElement.children[0].src;
        break;
      case "image":
        return this.imageElement.src;
        break;
      case "audio":
        return this.audioElement.src;
        break;
      default:
        return null;
        break;
    }
  }

  async refreshMediaView(url = this.getSource()) {
    var infos = await this.getPlayingMediaInfos();
    if (infos.height >= infos.width) {
      this.setOrientation("vertical");
    } else if (infos.height < infos.width) {
      this.setOrientation("horizontal");
    }
  }

  // Audio
  setAudioSource(url) {
    this.audioElement.src = url;
    this.audioElement.load();
  }

  isPlayableByAudioElement(file) {
    if (file.type.split("/")[0] == "audio") {
      var acceptedAudioFormats = [
        "flac",
        "m4a",
        "wav",
        "weba",
        "webm",
        "mp3",
        "ogg",
      ];
      return acceptedAudioFormats.includes(file.name.split(".").pop());
    } else {
      return false;
    }
  }

  async loadAudioFileFromBlob(blob) {
    // document.querySelector('div.viewer div.loading').style.display = '';
    // document.querySelector('div.viewer div.loading div.content h3 span').innerText = file.name;
    var b64 = URL.createObjectURL(blob);
    if (this.isPlayableByAudioElement(blob)) {
      this.setAudioSource(b64);
      // await utils.getPromiseFromEvent(this.audioElement, 'loadeddata');
      // document.querySelector('div.viewer div.loading').style.display = 'none';
      return file;
    } else if (blob.type == "audio/mid") {
      if (this.midiPlayer.player == null) {
        try {
          await this.installMidiPlayer();
          this.playMIDIAudio();
        } catch {
          popups.alert("MIDIjs could not be imported.");
        }
      }

      // document.querySelector('div.viewer div.loading').style.display = 'none';
    }
    await utils.delay(0.2);
    if (this.playWhenLoaded) viewer.play();
    this.reloadMenus();
    this.refreshTracksMenus();
    this.showText(blob.name);
  }

  async importAudioFile() {
    const pickerOpts = {
      types: [
        {
          description: ui_translator.getDialogInLanguage("file_uploads/audios"),
          accept: {
            "audio/*": [".mp3", ".wav", ".ogg", ".webm", ".weba"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };
    var [file] = await (window.showOpenFilePicker || this.showOpenFilePicker)(
      pickerOpts,
    );
    file = await file.getFile();
    await this.loadAudioFileFromBlob(file);

    this.reloadMenus();
    this.refreshTracksMenus();
  }

  async showText(text) {
    this.fileName.children[0].innerText = text;
    this.fileName.classList.toggle("hidden");
    await utils.delay(3);
    this.fileName.classList.toggle("hidden");
  }

  // Video
  async setVideoSource(url) {
    this.videoElement.children[0].src = url;
    this.timeInputPreview.video.children[0].src = url;
    this.refreshMediaView();
    this.videoElement.load();
    this.timeInputPreview.video.load();
    await utils.delay(1);
    reloadMenus();
    this.refreshTracksMenus();
  }

  async loadVideoFileFromBlob(blob) {
    // document.querySelector('div.viewer div.loading').style.display = '';
    // document.querySelector('div.viewer div.loading div.content h3 span').innerText = file.name;
    var b64 = URL.createObjectURL(blob);
    this.setVideoSource(b64);
    await utils.getPromiseFromEvent(this.videoElement, "loadstart");
    this.reloadMenus();
    this.refreshTracksMenus();
    // document.querySelector('div.viewer div.loading').style.display = 'none';
    if (this.playWhenLoaded) viewer.play();
    this.reloadMenus();
    this.refreshTracksMenus();
    this.showText(blob.name);
  }

  async loadLyricsFileFromBlob(blob) {
    this.lyrics = this.readLyrics(await blob.text());
    this.fileName.children[0].innerText = "Loaded lyrics";
    this.fileName.classList.toggle("hidden");
    await utils.delay(3);
    this.fileName.classList.toggle("hidden");
  }

  async loadLyricsFileFromURL(url) {
    var blob = await fetch(url).then((r) => r.blob());
    this.loadLyricsFileFromBlob(blob);
  }

  async importVideoFile() {
    const pickerOpts = {
      types: [
        {
          description: ui_translator.getDialogInLanguage("file_uploads/videos"),
          accept: {
            "video/*": [".mp4", ".webm", ".webv", ".ogv", ".mpeg", ".mpg"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };
    var [file] = await (window.showOpenFilePicker || this.showOpenFilePicker)(
      pickerOpts,
    );
    file = await file.getFile();
    await this.loadVideoFileFromBlob(file);

    this.reloadMenus();
    this.refreshTracksMenus();
  }

  async importLyricsFile() {
    const pickerOpts = {
      types: [
        {
          description: ui_translator.getDialogInLanguage("file_uploads/lyrics"),
          accept: {
            "*/lrc": [".lrc"],
            "*/vtt": [".vtt"],
            "*/srt": [".srt"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };
    var [file] = await (window.showOpenFilePicker || this.showOpenFilePicker)(
      pickerOpts,
    );
    file = await file.getFile();
    await this.loadLyricsFileFromBlob(file);

    this.reloadMenus();
  }

  switchVideoToPC() {
    this.videoElement.style.width =
      utils.getBrowserName() === "firefox"
        ? "-moz-available"
        : "-webkit-fill-available";
    this.videoElement.style.height = "";
  }

  switchVideoToPhone() {
    this.videoElement.style.width = "";
    this.videoElement.style.height = window.outerHeight + "px";
  }

  //// YouTube
  isYouTubeVideoURL(url) {
    return (
      url.includes("youtube.com/embed") ||
      url.includes("youtu.be") ||
      url.includes("youtube.com/watch?") ||
      url.includes("youtube.com/shorts")
    );
  }

  getIdOfYouTubeVideoURL(url) {
    const itemOfFromString = (item, from, splitby) => {
      return String(from).split(String(splitby))[Number(item) - 1] || "";
    };

    if (url.includes("youtube.com/embed")) {
      // YouTube Embed Video
      return itemOfFromString(
        2,
        itemOfFromString(1, url, "?"),
        "youtube.com/embed/",
      );
    } else if (url.includes("youtu.be")) {
      // youtu.be short link
      return itemOfFromString(2, itemOfFromString(1, url, "?"), "youtu.be/");
    } else if (url.includes("youtube.com/watch?")) {
      // youtube.com/watch?v={ID} - Basic YouTube url
      const queryString = "?" + itemOfFromString(2, url, "?");
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get("v");
    } else if (url.includes("youtube.com/shorts")) {
      // YouTube Shorts
      return url.replace("youtube.com/shorts/", "");
    } else {
      return null;
    }
  }

  // Image
  setImageSource(url) {
    this.imageElement.src = url;
    this.refreshMediaView();
  }

  async loadImageFileFromBlob(blob) {
    var b64 = URL.createObjectURL(blob);
    this.setImageSource(b64);
    if (this.playWhenLoaded) viewer.play();
    this.reloadMenus();
    this.refreshTracksMenus();
    this.fileName.children[0].innerText = blob.name;
    await utils.delay(0.2);
    this.fileName.classList.toggle("hidden");
    await utils.delay(3);
    this.fileName.classList.toggle("hidden");
  }

  async importImageFile() {
    const pickerOpts = {
      types: [
        {
          description: ui_translator.getDialogInLanguage("file_uploads/images"),
          accept: {
            "image/*": [".webm", ".webp", ".gif", ".png", ".jpg"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };
    var [file] = await (window.showOpenFilePicker || this.showOpenFilePicker)(
      pickerOpts,
    );
    file = await file.getFile();
    await this.loadImageFileFromBlob(file);

    this.reloadMenus();
    this.refreshTracksMenus();
  }

  async showOpenFilePicker(options = {}) {
    function getPromiseFromEvent(item, event) {
      return new Promise((resolve) => {
        const listener = (e) => {
          item.removeEventListener(event, listener);
          resolve(e);
        };
        item.addEventListener(event, listener);
      });
    }

    class FakeFileSystemHandle {
      constructor(blob) {
        this.blob = blob;
        this.name = blob.name;
        this.kind = "file";
      }

      getFile() {
        return this.blob;
      }
    }

    let input = document.createElement("input");
    input.type = "file";
    if (options.multiple) input.setAttribute("multiple", "");
    var opt_types = options.types.map((e) => e.accept[Object.keys(e.accept)]);
    if (options.types) {
      var types = [];
      for (var type of opt_types) {
        for (var type_ of type) {
          if (!types.includes(type_)) {
            types.push(type_);
          }
        }
      }
      input.accept = types.join(", ");
    }
    input.click();
    await getPromiseFromEvent(input, "change");
    let files = [];
    for (var file of input.files) {
      files.push(new FakeFileSystemHandle(file));
    }
    if (files.length == 0) {
      throw Error("User aborted");
    }
    return files;
  }

  _importFile() {
    const pickerOpts = {
      types: [],
      excludeAcceptAllOption: true,
      multiple: false,
    };

    const video = {
      description: ui_translator.getDialogInLanguage("file_uploads/videos"),
      accept: {
        "*/*": [".mp4", ".webm", ".webv", ".ogv", ".mpeg", ".mpg"],
      },
    };
    const audio = {
      description: ui_translator.getDialogInLanguage("file_uploads/audios"),
      accept: {
        "*/*": [".mp3", ".wav", ".ogg", ".webm", ".weba"],
      },
    };
    const image = {
      description: ui_translator.getDialogInLanguage("file_uploads/images"),
      accept: {
        "*/*": [".webm", ".webp", ".gif", ".png", ".jpg"],
      },
    };

    switch (this.mode) {
      case "video":
        pickerOpts.types = [video, audio, image];
        break;
      case "audio":
        pickerOpts.types = [audio, video, image];
        break;
      case "image":
        pickerOpts.types = [image, audio, video];
        break;
      default:
        break;
    }

    return (window.showOpenFilePicker || this.showOpenFilePicker)(pickerOpts);
  }

  async importFile() {
    var [file] = await this._importFile();
    file = await file.getFile();

    switch (file.type.split("/")[0]) {
      case "video":
        this.mode = "video";
        await this.loadVideoFileFromBlob(file);
        break;
      case "audio":
        this.mode = "audio";
        await this.loadAudioFileFromBlob(file);
        break;
      case "image":
        this.mode = "image";
        await this.loadImageFileFromBlob(file);
        break;
      default:
        break;
    }

    this.reloadMenus();
    this.refreshTracksMenus();
  }

  async importFileInNewTab() {
    var [file] = await this._importFile();
    file = await file.getFile();
    var url = URL.createObjectURL(file);
    open(`.?url=${encodeURIComponent(url)}&filename=${file.name}`, "_blank");
  }

  play() {
    this.getElementOfMode().play();
    document
      .querySelector("div.viewer div.controls div.playpause .play")
      .classList.remove("hidden");
    document
      .querySelector("div.viewer div.controls div.playpause .pause")
      .classList.remove("hidden");
    document
      .querySelector("div.viewer div.controls div.playpause .play")
      .classList.add("hidden");
    this.refreshTime();
  }

  pause() {
    this.getElementOfMode().pause();
    document
      .querySelector("div.viewer div.controls div.playpause .play")
      .classList.remove("hidden");
    document
      .querySelector("div.viewer div.controls div.playpause .pause")
      .classList.remove("hidden");
    document
      .querySelector("div.viewer div.controls div.playpause .pause")
      .classList.add("hidden");
  }

  isPaused() {
    return this.getElementOfMode().paused;
  }

  goBackward(x = 5) {
    x = x * this.speed;
    this.getElementOfMode().currentTime =
      this.getElementOfMode().currentTime - x;
    this.refreshTime();
  }

  goBackward2(x = 10) {
    x = x * this.speed;
    this.getElementOfMode().currentTime =
      this.getElementOfMode().currentTime - x;
    this.refreshTime();
  }

  goForeward(x = 5) {
    x = x * this.speed;
    this.getElementOfMode().currentTime =
      this.getElementOfMode().currentTime + x;
    this.refreshTime();
  }

  goForeward2(x = 10) {
    x = x * this.speed;
    this.getElementOfMode().currentTime =
      this.getElementOfMode().currentTime + x;
    this.refreshTime();
  }

  toggleLecture() {
    if (this.isPaused()) {
      this.play();
    } else {
      this.pause();
    }
  }

  refreshVolumeIcon() {
    if (this.muted) {
      document.querySelector(
        "div.controls div.options div.volume svg g g.vol",
      ).style.display = "none";
      return;
    }
    document.querySelector(
      "div.controls div.options div.volume svg g g.vol",
    ).style.display = "";
    if (Number(this.volumeInput.value) >= 75) {
      document.querySelector(
        "div.controls div.options div.volume svg g g path.c",
      ).style.display = "";
    } else {
      document.querySelector(
        "div.controls div.options div.volume svg g g path.c",
      ).style.display = "none";
    }

    if (Number(this.volumeInput.value) >= 25) {
      document.querySelector(
        "div.controls div.options div.volume svg g g path.b",
      ).style.display = "";
    } else {
      document.querySelector(
        "div.controls div.options div.volume svg g g path.b",
      ).style.display = "none";
    }

    if (Number(this.volumeInput.value) > 0) {
      document.querySelector(
        "div.controls div.options div.volume svg g g path.a",
      ).style.display = "";
    } else {
      document.querySelector(
        "div.controls div.options div.volume svg g g path.a",
      ).style.display = "none";
    }
  }

  get mode() {
    return this.#mode;
  }

  set mode(mode) {
    this.#mode = mode;
    if (!this.initialized) return;
    if (mode !== "video") this.videoElement.pause();
    if (mode !== "audio") this.audioElement.pause();
    if (mode !== "iframe") this.iframeElement.src = "";

    this.videoElement.style.display = "none";
    this.audioDiv.style.display = "none";
    this.imageElement.style.display = "none";
    this.controls_picture_in_picture.style.display = "none";
    this.iframeElement.style.display = "none";

    document
      .querySelector(".viewer .closefullscreenbtn")
      .classList.add("hidden");

    switch (mode) {
      case "video":
        this.videoElement.style.display = "";
        this.controls_picture_in_picture.style.display = "";
        break;
      case "image":
        this.imageElement.style.display = "";
        break;
      case "audio":
        this.audioDiv.style.display = "";
        break;
      case "iframe":
        this.waitforclick.classList.add("hidden");
        this.iframeElement.style.display = "";
        document
          .querySelector(".viewer .closefullscreenbtn")
          .classList.remove("hidden");
        break;
      default:
        break;
    }
  }

  getElementOfMode(mode = this.mode) {
    if (mode == "video") {
      return this.videoElement;
    } else if (mode == "image") {
      return this.imageFakeVideo;
    } else if (mode == "audio") {
      return this.audioElement;
    }
  }

  async getTypeOfURL(url) {
    if (this.isYouTubeVideoURL(url)) {
      return "youtube";
    }

    var blob = await fetch(url).then((r) => r.blob());
    if (blob.type == "") {
      if (url.split("/")[url.split("/").length - 1].includes(".")) {
        return url.split(".").pop();
      }
      return url.split("/")[url.split("/").length - 1];
    }
    return blob.type.split("/")[0];
  }

  setIframeSource(url) {
    this.iframeElement.src = url;
  }

  exitFullscreen() {
    this.mode = "video";
    this.setIframeSource("");
  }

  async openNetworkFlux(url) {
    const getFileNameFrom = (url) => {
      url = url.replaceAll("\\", "/");
      if (
        !url.includes("/") ||
        [/^blob:/, /^data:/].map((regexp) => !!url.match(regexp)).includes(true)
      )
        return null;
      return url.split("/")[url.split("/").length - 1];
    };

    const deleteSearchParam = (...ids) => {
      let search = new URLSearchParams(window.location.search);
      for (var id of ids) {
        search.delete(id);
        window.history.replaceState("", "", "?" + search.toString());
      }
    };

    loader.show();
    loader.html = ui_translator
      .getDialogInLanguage("loading_file/from")
      .replace(
        "[FILE]",
        getFileNameFrom(url) ||
          new URLSearchParams(window.location.search).get("filename"),
      )
      .replaceAll("[ORIGIN]", url);
    deleteSearchParam("filename", "url");
    var type = await this.getTypeOfURL(url);
    this.pause();
    this.mode = type;
    switch (type) {
      case "image":
        this.setImageSource(url);
        break;
      case "video":
        this.setVideoSource(url);
        break;
      case "audio":
        this.setAudioSource(url);
        break;
      case "youtube":
        url =
          "https://www.youtube.com/embed/" + this.getIdOfYouTubeVideoURL(url);
      default:
        this.setIframeSource(url);
        this.mode = "iframe";
        break;
    }
    loader.hide();
  }

  async openNetworkFluxPopup() {
    let url = await popups.prompt(
      ui_translator.getDialogInLanguage("controls/open_network_flux"),
      "",
      "URL",
      "",
      "url",
    );
    this.openNetworkFlux(url);
  }

  set fullscreen(on) {
    if (on) {
      try {
        this.viewer.webkitRequestFullScreen();
        document
          .querySelectorAll("div.controls div.options div.fullscreen svg")
          .forEach((element) => {
            element.classList.toggle("hidden");
          });
      } catch (err) {
        try {
          this.viewer.requestFullscreen();
        } catch (err) {
          // Guess we could't enter to fullscreen
        }
      }
      return;
    }
    document
      .querySelectorAll("div.controls div.options div.fullscreen svg")
      .forEach((element) => {
        element.classList.toggle("hidden");
      });

    try {
      document.exitFullscreen();
    } catch (err) {
      try {
        document.webkitExitFullscreen();
      } catch {
        try {
          document.webkitCancelFullScreen();
        } catch {
          // Guess we could't exit fullscreen
          document
            .querySelectorAll("div.controls div.options div.fullscreen svg")
            .forEach((element) => {
              element.classList.toggle("hidden");
            });
        }
      }
    }
  }

  get fullscreen() {
    return document.fullscreenElement;
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  pictureInPictureEnabled() {
    return document.pictureInPictureEnabled;
  }

  get pictureInPicture() {
    return document.pictureInPictureElement !== null;
  }

  set pictureInPicture(on) {
    if (this.mode == "video" && this.pictureInPictureEnabled()) {
      if (on) {
        try {
          this.getElementOfMode().requestPictureInPicture();
        } catch {
          // Guess PIP mode is not available
        }
      } else {
        try {
          document.exitPictureInPicture();
        } catch {
          // Guess we could not exit PIP
        }
      }
    }
  }

  togglePictureInPicture() {
    this.pictureInPicture = !this.pictureInPicture;
  }

  set speed(speed) {
    viewer = this;
    (async () => {
      if (speed == "custom") {
        speed = Number(
          await popups.prompt(
            ui_translator.getDialogInLanguage("controls/enter_custom_speed"),
          ),
        );
        viewer.speed = speed;
      }
    })();
    
    this.videoElement.playbackRate = speed;
    this.audioElement.playbackRate = speed;
  
    // Update the displayed speed in the menu
    const selectedSpeed = document.getElementById("selectedSpeed");
    selectedSpeed.innerText = speed + "x";
  
    // Hide the speed dropdown
    const speedDropdown = document.getElementById("speedDropdown");
    speedDropdown.classList.add("hidden");
  }

  get speed() {
    return this.videoElement.playbackRate;
  }

  getLoop() {
    return this.loop;
  }

  loopThis() {
    this.getElementOfMode().loop = true;
    this.setLoop("loopone");
    document.querySelector(
      "div.controls div.options div.loop svg g g text tspan",
    ).style.display = "";
    document
      .querySelector("div.controls div.options div.loop svg g g g.arrow")
      .setAttribute("stroke-width", 24);
  }

  loopOff() {
    this.getElementOfMode().loop = false;
    this.setLoop("noloop");
    document.querySelector(
      "div.controls div.options div.loop svg g g text tspan",
    ).style.display = "none";
    document
      .querySelector("div.controls div.options div.loop svg g g g.arrow")
      .setAttribute("stroke-width", 12);
  }

  setLoop(loop) {
    this.loop = loop;
  }

  toggleLoop() {
    if (this.getLoop() == "noloop") {
      this.loopThis();
    } else {
      this.loopOff();
    }
  }

  set muted(on) {
    this.videoElement.muted = on;
    this.audioElement.muted = on;
    this.volumeInput.disabled = on;
    document.querySelector(
      "div.controls div.options div.volume svg g g g.vol",
    ).style.display = on ? "none" : "";
  }

  get muted() {
    return this.videoElement.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
  }

  set volume(volume) {
    if (volume == "custom") {
      volume = Number(
        popups.prompt(
          ui_translator.getDialogInLanguage("controls/set_volume_to"),
        ),
      ); // translate
    }

    this.videoElement.volume = volume;
    this.audioElement.volume = volume;
    this.volumeInput.value = volume * 100;

    if (this.muted) {
      this.volumeInput.disabled = false;
      this.volumeInput.disabled = true;
    }
    this.refreshVolumeIcon();
  }

  get volume() {
    return this.videoElement.volume;
  }

  volumeUp() {
    this.volume += 5;
  }

  volumeUp2() {
    this.volume += 10;
  }

  volumeDown() {
    this.volume -= 5;
  }

  volumeDown2() {
    this.volume -= 10;
  }

  refreshElementTime() {
    try {
      this.getElementOfMode().currentTime =
        (Number(this.timeInput.value) * this.getElementOfMode().duration) /
        100000;
    } catch {}
  }

  refreshTimeInput() {
    this.refreshMediaView();
    this.timeInput.value =
      (this.getElementOfMode().currentTime / this.getElementOfMode().duration) *
      100000;
  }

  refreshTimeIndicators() {
    var current_time = utils.s2hms(
      this.getElementOfMode().currentTime,
      "string",
      true,
    );
    var duration = utils.s2hms(
      this.getElementOfMode().duration,
      "string",
      true,
    );
    this.timeIndicators.time.innerText =
      this.getElementOfMode().duration >= 3600
        ? current_time
        : current_time.replace("00:", "");
    this.timeIndicators.total_time.innerText =
      this.getElementOfMode().duration >= 3600
        ? duration
        : duration.replace("00:", "");

    if (
      this.lyrics != null &&
      document.querySelector(".cc-menu input.visible").checked
    ) {
      document.querySelector(".subtitles span").innerHTML =
        this.lyrics.getLyricsForTimecode(this.getElementOfMode().currentTime) ||
        "";
    } else {
      document.querySelector(".subtitles span").innerText = "";
    }
  }

  refreshTime() {
    this.refreshTimeInput();
    this.refreshTimeIndicators();
  }

  hms2s(hms) {
    const last = (list) => list[list.length - 1];
    var r = 0;
    if (hms.includes(":")) {
      if (hms.split(":").length == 3) {
        r += Number(hms.split(":")[0]) * 3600;
        r += Number(hms.split(":")[1]) * 60;
      } else if (hms.split(":").length == 2) {
        r += Number(hms.split(":")[0]) * 60;
      }
      r += Number(last(hms.split(":")));
    } else {
      r += Number(hms);
    }
    return r;
  }

  vttToLrc(vttText) {
    // Split the WebVTT text into lines
    const lines = vttText.split("\n");
    const lrcLines = [];
    const timestampRegex =
      /^([0-9][0-9]*):([0-9][0-9]):([0-9][0-9])[,.]([0-9][0-9][0-9]) --> ([0-9][0-9]):([0-9][0-9]):([0-9][0-9])[,.]([0-9][0-9][0-9])/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const matches = line.match(timestampRegex);
      if (matches) {
        const [
          timestamp,
          startHours,
          startMinutes,
          startSeconds,
          startMilliseconds,
          endHours,
          endMinutes,
          endSeconds,
          endMilliseconds,
        ] = matches;
        var lrcStartTimestamp = `[${startHours * 60 + startMinutes}:${startSeconds}.${startMilliseconds}]`;
        const lrcEndTimestamp = `[${endHours * 60 + endMinutes}:${endSeconds}.${endMilliseconds}]`;
        var text = lines[i + 1] ? lines[i + 1].trim() : "";
        var j = 2;
        while ((lines[i + j + 3] || "").match(timestampRegex)) {
          text += "\n" + lines[i + j].trim();
          j += 1;
        }
        if (text) {
          lrcStartTimestamp += text;
        }
        lrcLines.push(lrcStartTimestamp);
        lrcLines.push(lrcEndTimestamp);
      }
    }
    return lrcLines.join("\n");
  }

  readLRCLyrics(lrcText) {
    var result = {
      lyrics: {},
    };

    var lines = lrcText.split("\n");
    const timestampRegex = new RegExp(
      `^\\[(${"[0-9]".repeat(3)}${"[0-9]?".repeat(10)}):(${"[0-9]".repeat(2)}).(${"[0-9]".repeat(3)})\\]`,
    );

    var i = 0;
    var last = null;

    for (i in lines) {
      if (typeof lines[i] == "string") {
        if (lines[i].match(timestampRegex)) {
          var [match, minutes, seconds, milliseconds] =
            lines[i].match(timestampRegex)[0];
          last = lines[i]
            .match(timestampRegex)[0]
            .substring(1)
            .replace("]", "");
          result[last] = lines[i].replace(
            lines[i].match(timestampRegex)[0],
            "",
          );
        } else {
          result[last] += "<br>" + lines[i];
        }
      }
    }

    result.getLyricsForTimecode = (s) => {
      var timecode = "";
      var timecodes = Object.keys(this.lyrics);
      for (var i in timecodes) {
        if (timecode == "") {
          if (this.hms2s(timecodes[timecodes.length - 1 - i]) <= s) {
            timecode = timecodes[timecodes.length - 1 - i];
          }
        }
      }
      return this.lyrics[timecode];
    };

    return result;
  }

  readLyrics(lyrics) {
    if (
      lyrics.replace(" ", "").replace("\n", "").startsWith("WEBVTT") ||
      (/^[0-9]/.test(lyrics.split("\n")[0]) &&
        /^([0-9][0-9][0-9]*):([0-9][0-9]):([0-9][0-9])[,.]([0-9][0-9][0-9]) --> ([0-9][0-9]):([0-9][0-9]):([0-9][0-9])[,.]([0-9][0-9][0-9])/.test(
          lyrics.split("\n")[1],
        ))
    ) {
      lyrics = this.vttToLrc(lyrics);
    }
    return this.readLRCLyrics(lyrics);
  }

  async importLyricsURI(uri) {
    let lyrics = await fetch(uri).then((r) => r.text());
    let parsed_lyrics = this.readLyrics(lyrics);
    this.lyrics = parsed_lyrics;
  }

  dragElement(elmnt) {
    var elmnt_query = elmnt;
    elmnt = document.querySelector(elmnt);
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.setAttribute("origin-width", elmnt.style.width);
    elmnt.setAttribute("origin-height", elmnt.style.height);
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      elmnt.setAttribute("align", "dragging");
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    async function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      if (elmnt.style.width == "100%") {
        elmnt.style.width = elmnt.getAttribute("origin-width");
        elmnt.style.height = elmnt.getAttribute("origin-height");
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      } else {
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      elmnt.setAttribute("previous-top", elmnt.style.top);
      elmnt.setAttribute("previous-left", elmnt.style.left);
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      elmnt.setAttribute("align", "drag");
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  captureFrameVideoElement(element) {
    const canvasToBlob = (canvas) => {
      return new Promise((resolve) => canvas.toBlob(resolve));
    };
    var canvas = document.createElement("canvas");
    var video = element;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    return canvasToBlob(canvas);
  }

  showCapturePopup(blob) {
    let blob_url = URL.createObjectURL(blob);
    console.log("Captured frame : " + blob_url);
    document.querySelector(".vfc .popup .main .preview img").src = blob_url;
    this.downloadVideoFrameCapture = () => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "WebMediaPlayer Video Capture.png";
      a.click();
    };
    document.querySelector(".vfc").classList.remove("hidden");
  }

  vfcSelected(element) {
    if (element.value == "custom") {
      this.takeCaptureOfVideoElementAtTime(
        Number(
          this.hms2s(prompt(ui_translator.getDialogInLanguage("vfc_custom"))),
        ),
      );
    } else {
      this.takeCaptureOfVideoElementAtTime();
    }
    element.value = "";
  }

  async takeCaptureOfVideoElementAtTime(time = "current") {
    if (time == "current") {
      this.showCapturePopup(
        await this.captureFrameVideoElement(this.videoElement),
      );
    } else {
      var currentTime = this.getElementOfMode().currentTime;
      this.getElementOfMode().currentTime = time;
      await utils.delay(0.2);
      this.showCapturePopup(
        await this.captureFrameVideoElement(this.videoElement),
      );
      await utils.delay(0.2);
      this.getElementOfMode().currentTime = currentTime;
    }
  }

  // Audio Tracks

  hasAudioTracks() {
    return document.createElement("video").audioTracks !== undefined;
  }

  playAudioTrackId(id) {
    if (!this.hasAudioTracks) return null;
    for (var i = 0; i < this.videoElement.audioTracks.length; i++) {
      this.videoElement.audioTracks[i].enabled = false;
    }
    this.videoElement.audioTracks.getTrackById(id).enabled = true;
    this.toggleLecture();
    this.toggleLecture();
    this.goBackward(0.0000000000000000000000000000000000001);
  }

  playAudioTrackNo(no) {
    if (!this.hasAudioTracks) return null;
    this.playAudioTrackId(this.videoElement.audioTracks[no].id);
  }

  getAudioTracks() {
    if (!this.hasAudioTracks) return null;
    try {
      let tracks = [];
      for (var i = 0; i < this.videoElement.audioTracks.length; i++) {
        tracks.push(this.videoElement.audioTracks[i]);
      }
      return tracks;
    } catch (e) {
      return null;
    }
  }

  getAudioTracksIDs() {
    if (!this.hasAudioTracks) return null;
    return this.getAudioTracks().map((x) => {
      return x["id"] || null;
    });
  }

  getAudioTracksLanguages() {
    if (!this.hasAudioTracks) return null;
    return this.getAudioTracks().map((x) => {
      return x["language"] || null;
    });
  }

  getAudioTracksFullLanguages() {
    let languages = this.getAudioTracksLanguages();
    for (var i = 0; i < languages.length; i++) {
      // console.log(languages[i]);
      if (["und", "zxx", "mul", "qaa", "mis"].includes(languages[i])) {
        languages[i] = ui_translator.getDialogInLanguage(
          "tracks/track_language_" + languages[i],
        );
      } else {
        languages[i] = this.full_languages_name[languages[i]] || languages[i];
      }
      // console.log(languages[i]);
    }
    return languages;
  }

  getAudioTracksAbbreviatedLanguages() {
    let languages = this.getAudioTracksLanguages();
    for (var i = 0; i < languages.length; i++) {
      languages[i] = languages[i].substring(0, 2);
    }
    return languages;
  }

  getAudioTracksLabels() {
    if (!this.hasAudioTracks) return null;
    return this.getAudioTracks().map((x) => {
      return x["label"] || null;
    });
  }

  getAudioTracksNumber() {
    if (!this.hasAudioTracks) return null;
    return this.videoElement.audioTracks.length;
  }

  getAudioTracksMenu() {
    try {
      let tracks = [];
      for (var i = 0; i < this.getAudioTracks().length; i++) {
        let track = this.getAudioTracks()[i];
        tracks.push({
          text:
            (track.label ||
              ui_translator.getDialogInLanguage("track") +
                " " +
                String(i + 1)) +
            " [" +
            this.getAudioTracksFullLanguages()[i] +
            "]",
          events: {
            click: function (e) {
              viewer.playAudioTrackId(track.id);
            },
          },
        });
      }
      return {
        text: ui_translator.getDialogInLanguage("tracks/audio_tracks"),
        sub: tracks,
      };
    } catch (e) {
      return null;
    }
  }

  addOptionInSelectMenu(element = document.createElement("select"), option) {
    let opt = document.createElement("option");
    opt.value = option.value;
    opt.innerText = option.text;
    element.appendChild(opt);
  }

  setSelectMenuOptions(element = document.createElement("select"), options) {
    element.innerHTML = "";
    for (var i = 0; i < options.length; i++) {
      this.addOptionInSelectMenu(element, options[i]);
    }
    return element;
  }

  refreshAudioTracksMenu() {
    if (!this.hasAudioTracks() || this.getAudioTracks().length == 0) {
      this.tracks.buttons.audio.classList.add("hidden");
      return;
    }
    this.tracks.buttons.audio.classList.remove("hidden");
    let tracks = this.getAudioTracks();
    let opts = [];
    for (var i = 0; i < tracks.length; i++) {
      opts.push({
        text:
          (tracks[i].label ||
            ui_translator.getDialogInLanguage("track") + " " + String(i + 1)) +
          " [" +
          this.getAudioTracksFullLanguages()[i] +
          "]",
        value: tracks[i].id,
      });
    }
    this.setSelectMenuOptions(this.tracks.menus.audio, opts);
    this.selectedAudioTrack(tracks[0].id);
  }

  openAudioTracksMenu() {
    document.querySelector(".audiotracks").classList.remove("hidden");
    this.refreshAudioTracksMenu();
  }

  selectedAudioTrack(value) {
    document.querySelector(
      ".audiotracks .popup .main .buttons span.track",
    ).innerText = document.querySelector(
      '.audiotracks .popup .main select option[value="' + value + '"]',
    ).innerText;
    let track = this.videoElement.audioTracks.getTrackById(value);
    document.querySelector(".audiotracks .popup .main .label input").value =
      track.label;
    document.querySelector(".audiotracks .popup .main .id input").value = value;
    document.querySelector(".audiotracks .popup .main .language input").value =
      this.getAudioTracksFullLanguages()[
        this.getAudioTracksIDs().indexOf(value)
      ];
  }

  playSelectedAudioTrack() {
    this.playAudioTrackId(this.tracks.menus.audio.value);
  }

  // Video tracks

  hasVideoTracks() {
    return document.createElement("video").videoTracks !== undefined;
  }

  playVideoTrackId(id) {
    if (!this.hasVideoTracks) return null;
    for (var i = 0; i < this.videoElement.videoTracks.length; i++) {
      this.videoElement.videoTracks[i].selected = false;
    }
    this.videoElement.videoTracks.getTrackById(id).selected = true;
    this.toggleLecture();
    this.toggleLecture();
    this.goBackward(0.0000000000000000000000000000000000001);
  }

  playVideoTrackNo(no) {
    if (!this.hasVideoTracks) return null;
    this.playVideoTrackId(this.videoElement.videoTracks[no].id);
  }

  getVideoTracks() {
    if (!this.hasVideoTracks) return null;
    try {
      let tracks = [];
      for (var i = 0; i < this.videoElement.videoTracks.length; i++) {
        tracks.push(this.videoElement.videoTracks[i]);
      }
      return tracks;
    } catch (e) {
      return null;
    }
  }

  getVideoTracksIDs() {
    if (!this.hasVideoTracks) return null;
    return this.getVideoTracks().map((x) => {
      return x["id"] || null;
    });
  }

  getVideoTracksLanguages() {
    if (!this.hasVideoTracks) return null;
    return this.getVideoTracks().map((x) => {
      return x["language"] || null;
    });
  }

  getVideoTracksFullLanguages() {
    let languages = this.getVideoTracksLanguages();
    for (var i = 0; i < languages.length; i++) {
      // console.log(languages[i]);
      if (["und", "zxx", "mul", "qaa", "mis"].includes(languages[i])) {
        languages[i] = ui_translator.getDialogInLanguage(
          "tracks/track_language_" + languages[i],
        );
      } else {
        languages[i] = this.full_languages_name[languages[i]] || languages[i];
      }
      // console.log(languages[i]);
    }
    return languages;
  }

  getVideoTracksAbbreviatedLanguages() {
    let languages = this.getVideoTracksLanguages();
    for (var i = 0; i < languages.length; i++) {
      languages[i] = languages[i].substring(0, 2);
    }
    return languages;
  }

  getVideoTracksLabels() {
    if (!this.hasVideoTracks) return null;
    return this.getVideoTracks().map((x) => {
      return x["label"] || null;
    });
  }

  getVideoTracksNumber() {
    if (!this.hasVideoTracks) return null;
    return this.videoElement.videoTracks.length;
  }

  getVideoTracksMenu() {
    try {
      let tracks = [];
      for (var i = 0; i < this.getVideoTracks().length; i++) {
        let track = this.getVideoTracks()[i];
        tracks.push({
          text:
            (track.label ||
              ui_translator.getDialogInLanguage("track") +
                " " +
                String(i + 1)) +
            " [" +
            this.getVideoTracksFullLanguages()[i] +
            "]",
          events: {
            click: function (e) {
              viewer.playVideoTrackId(track.id);
            },
          },
        });
      }
      return {
        text: ui_translator.getDialogInLanguage("tracks/video_tracks"),
        sub: tracks,
      };
    } catch (e) {
      return null;
    }
  }

  addOptionInSelectMenu(element = document.createElement("select"), option) {
    let opt = document.createElement("option");
    opt.value = option.value;
    opt.innerText = option.text;
    element.appendChild(opt);
  }

  setSelectMenuOptions(element = document.createElement("select"), options) {
    element.innerHTML = "";
    for (var i = 0; i < options.length; i++) {
      this.addOptionInSelectMenu(element, options[i]);
    }
    return element;
  }

  refreshTracksMenus() {
    if (this.mode == "video") {
      this.refreshAudioTracksMenu();
      this.refreshVideoTracksMenu();
    } else {
      this.tracks.buttons.video.classList.add("hidden");
      this.tracks.buttons.audio.classList.add("hidden");
    }
  }

  refreshVideoTracksMenu() {
    if (!this.hasVideoTracks() || this.getVideoTracks().length == 0) {
      this.tracks.buttons.video.classList.add("hidden");
      return;
    }
    this.tracks.buttons.video.classList.remove("hidden");
    let tracks = this.getVideoTracks();
    let opts = [];
    for (var i = 0; i < tracks.length; i++) {
      opts.push({
        text:
          (tracks[i].label ||
            ui_translator.getDialogInLanguage("track") + " " + String(i + 1)) +
          " [" +
          this.getVideoTracksFullLanguages()[i] +
          "]",
        value: tracks[i].id,
      });
    }
    this.setSelectMenuOptions(this.tracks.menus.video, opts);
    this.selectedVideoTrack(tracks[0].id);
  }

  openVideoTracksMenu() {
    document.querySelector(".videotracks").classList.remove("hidden");
    this.refreshVideoTracksMenu();
  }

  selectedVideoTrack(value) {
    document.querySelector(
      ".videotracks .popup .main .buttons span.track",
    ).innerText = document.querySelector(
      '.videotracks .popup .main select option[value="' + value + '"]',
    ).innerText;
    let track = this.videoElement.videoTracks.getTrackById(value);
    document.querySelector(".videotracks .popup .main .label input").value =
      track.label;
    document.querySelector(".videotracks .popup .main .id input").value = value;
    document.querySelector(".videotracks .popup .main .language input").value =
      this.getVideoTracksFullLanguages()[
        this.getVideoTracksIDs().indexOf(value)
      ];
  }

  playSelectedVideoTrack() {
    this.playVideoTrackId(this.tracks.menus.video.value);
  }

  getQueryOfElement(element) {
    var elements = [];
    var e = null;
    elements.push(element);
    while (e != document.body) {
      elements.push(elements[elements.length - 1].parentElement);
      e = elements[elements.length - 1];
    }
    elements.reverse();

    var query = "";

    for (var i in elements) {
      query += elements[i].localName;

      if (elements[i].id != "") {
        query += "#" + elements[i].id;
      }

      if (elements[i].className != "") {
        if (elements[i].className.includes(" ")) {
          query += "." + elements[i].className.replaceAll(" ", ".");
        } else {
          query += "." + elements[i].className;
        }
      }

      if (elements.length - 1 != i) {
        query += " ";
      }
    }

    return query;
  }

  getQueryAllOfElement(element) {
    let q = getQueryOfElement(element);
    let qall = [];

    for (var i = 0; i < document.querySelectorAll(q).length; i++) {
      qall.push(document.querySelectorAll(q)[i]);
    }

    return { query: q, index: qall.indexOf(element) };
  }

  getFileType(file) {
    let video_exts = [".mp4", ".webm", ".webv", ".ogv", ".mpeg", ".mpg"];
    let image_exts = [".webm", ".webp", ".gif", ".png", ".jpg"];
    let audio_exts = [".mp3", ".wav", ".ogg", ".webm", ".weba"];
    let lyrics_exts = ["lrc", "vtt", "srt"];

    if (file instanceof Blob) {
      file = file.name;
    }

    if (!file.includes(".")) {
      return file;
    }

    if (video_exts.includes(file.split(".").pop())) {
      return "video";
    } else if (image_exts.includes(file.split(".").pop())) {
      return "image";
    } else if (audio_exts.includes(file.split(".").pop())) {
      return "audio";
    } else if (lyrics_exts.includes(file.split(".").pop())) {
      return "subtitles";
    } else {
      return file.split(".").pop();
    }
  }

  async getMediaInfos(url, checkResponse = true) {
    var data = { sucess: true };
    if (this.getFileType(url) == "video") {
      let video = document.createElement("video");
      video.src = url;

      if (checkResponse) {
        while (video.videoHeight == 0) {
          await utils.delay(0.1);
        }

        while (video.videoWidth == 0) {
          await utils.delay(0.1);
        }

        while (video.duration == NaN) {
          await utils.delay(0.1);
        }
      }

      Object.assign(data, {
        height: video.videoHeight,
        width: video.videoWidth,
        duration: video.duration,
      });
    } else if (this.getFileType(url) == "image") {
      let image = document.createElement("img");
      image.src = url;

      if (checkResponse) {
        while (image.height == 0) {
          await utils.delay(0.1);
        }

        while (image.width == 0) {
          await utils.delay(0.1);
        }
      }

      Object.assign(data, { height: image.height, width: image.width });
    } else if (this.getFileType(url) == "audio") {
      let audio = document.createElement("audio");
      audio.src = url;

      if (checkResponse) {
        while (audio.duration == NaN) {
          await utils.delay(0.1);
        }
      }

      Object.assign(data, { duration: audio.duration });
    } else {
      data.sucess = false;
    }

    return data;
  }

  async getPlayingMediaInfos(mode = this.mode, checkResponse = true) {
    var data = { sucess: true };

    var video, image, audio;
    video = this.videoElement;
    image = this.imageElement;
    audio = this.audioElement;

    if (mode == "video") {
      if (checkResponse) {
        while (video.videoHeight == 0) {
          await utils.delay(0.1);
        }

        while (video.videoWidth == 0) {
          await utils.delay(0.1);
        }

        while (video.duration == NaN) {
          await utils.delay(0.1);
        }
      }

      Object.assign(data, {
        height: video.videoHeight,
        width: video.videoWidth,
        duration: video.duration,
      });
    } else if (mode == "image") {
      if (checkResponse) {
        while (image.height == 0) {
          await utils.delay(0.1);
        }

        while (image.width == 0) {
          await utils.delay(0.1);
        }
      }

      Object.assign(data, { height: image.height, width: image.width });
    } else if (mode == "audio") {
      if (checkResponse) {
        while (audio.duration == NaN) {
          await utils.delay(0.1);
        }
      }

      Object.assign(data, { duration: audio.duration });
    } else {
      data.sucess = false;
    }

    return data;
  }
}

let viewer = new Viewer(true, true);
