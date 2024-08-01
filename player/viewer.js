class Viewer {
  constructor(keyboardShortcuts = false, playWhenLoaded = false) {
    this.viewer = document.querySelector('div.viewer');
    this.playlist = document.querySelector('div.playlist');
    this.mode = 'video';
    this.full_languages_name = {"abk":{"full":"Abkhazian"},"ace":{"full":"Achinese"},"ach":{"full":"Acoli"},"ada":{"full":"Adangme"},"ady":{"full":"Adyghe; Adygei"},"aar":{"full":"Afar"},"afh":{"full":"Afrihili"},"afr":{"full":"Afrikaans"},"afa":{"full":"Afro-Asiatic"},"aka":{"full":"Akan"},"akk":{"full":"Akkadian"},"alb":{"full":"Albanian","speak":{"speakerGenderRestriction":"Male"}},"sqi":{"full":"Albanian"},"ale":{"full":"Aleut"},"alg":{"full":"Algonquian"},"amh":{"full":"Amharic","speak":{"isExist":false}},"apa":{"full":"Apache"},"ara":{"full":"Arabic"},"arg":{"full":"Aragonese"},"arc":{"full":"Aramaic"},"arp":{"full":"Arapaho"},"arn":{"full":"Araucanian"},"arw":{"full":"Arawak"},"arm":{"full":"Armenian","speak":{"speakerGenderRestriction":"Male"}},"hye":{"full":"Armenian","speak":{"isExist":false}},"asm":{"full":"Assamese"},"ast":{"full":"Asturian; Bable"},"ath":{"full":"Athapascan"},"aus":{"full":"Australian"},"map":{"full":"Austronesian"},"ava":{"full":"Avaric"},"ave":{"full":"Avestan"},"awa":{"full":"Awadhi"},"aym":{"full":"Aymara"},"aze":{"full":"Azerbaijani","speak":{"isExist":false}},"ban":{"full":"Balinese"},"bal":{"full":"Baluchi"},"bam":{"full":"Bambara"},"bai":{"full":"Bamileke"},"bad":{"full":"Banda"},"bar":{"full":"Bavarian","speak":{"optional":"deu"}},"bnt":{"full":"Bantu"},"bas":{"full":"Basa"},"bak":{"full":"Bashkir"},"baq":{"full":"Basque"},"eus":{"full":"Basque"},"btk":{"full":"Batak"},"bej":{"full":"Beja"},"bel":{"full":"Belarusian","speak":{"optional":"rus"}},"bem":{"full":"Bemba"},"ben":{"full":"Bengali","speak":{"isExist":false}},"ber":{"full":"Berber"},"bho":{"full":"Bhojpuri"},"bih":{"full":"Bihari"},"bik":{"full":"Bikol"},"bin":{"full":"Bini"},"bis":{"full":"Bislama"},"bjz":{"full":"Baruga","speak":{"optional":"eng"}},"byn":{"full":"Blin"},"nob":{"full":"Norwegian"},"bos":{"full":"Bosnian","speak":{"speakerGenderRestriction":"Male"}},"bra":{"full":"Braj"},"bre":{"full":"Breton"},"bug":{"full":"Buginese"},"bul":{"full":"Bulgarian","speak":{"isExist":false}},"bua":{"full":"Buriat"},"bur":{"full":"Burmese"},"mya":{"full":"Burmese"},"cad":{"full":"Caddo"},"car":{"full":"Carib"},"spa":{"full":"Spanish"},"cat":{"full":"Valencian","speak":{"optional":"eng"}},"ceb":{"full":"Cebuano"},"cel":{"full":"Celtic"},"cai":{"full":"Central American Indian"},"chg":{"full":"Chagatai"},"cmc":{"full":"Chamic"},"cha":{"full":"Chamorro"},"che":{"full":"Chechen"},"chr":{"full":"Cherokee"},"chy":{"full":"Cheyenne"},"chb":{"full":"Chibcha"},"nya":{"full":"Nyanja; Chichewa; Chewa"},"chi":{"full":"Chinese"},"zho":{"full":"Chinese"},"chn":{"full":"Chinook jargon"},"chp":{"full":"Chipewyan"},"cho":{"full":"Choctaw"},"zha":{"full":"Zhuang; Chuang"},"chk":{"full":"Chuukese"},"chv":{"full":"Chuvash"},"nwc":{"full":"Old Newari; Classical Newari; Classical Nepal Bhasa"},"cmn":{"full":"Mandarin Chinese","speak":{"optional":"chi"}},"cop":{"full":"Coptic"},"cor":{"full":"Cornish"},"cos":{"full":"Corsican"},"cre":{"full":"Cree"},"mus":{"full":"Creek"},"crp":{"full":"Creoles and pidgins"},"cpe":{"full":"Creoles and pidgins, English-based"},"cpf":{"full":"Creoles and pidgins, French-based"},"cpp":{"full":"Creoles and pidgins, Portuguese-based"},"crh":{"full":"Crimean Tatar; Crimean Turkish"},"scr":{"full":"Croatian"},"hrv":{"full":"Croatian","speak":{"speakerGenderRestriction":"Male"}},"cus":{"full":"Cushitic"},"cze":{"full":"Czech"},"ces":{"full":"Czech"},"dak":{"full":"Dakota"},"dan":{"full":"Danish"},"dar":{"full":"Dargwa"},"day":{"full":"Dayak"},"del":{"full":"Delaware"},"din":{"full":"Dinka"},"div":{"full":"Divehi"},"doi":{"full":"Dogri"},"dgr":{"full":"Dogrib"},"dra":{"full":"Dravidian"},"dua":{"full":"Duala"},"dut":{"full":"Flemish; Dutch"},"nld":{"full":"Flemish; Dutch","speak":{"isExist":false}},"dum":{"full":"Dutch"},"dyu":{"full":"Dyula"},"dzo":{"full":"Dzongkha","speak":{"isExist":false}},"efi":{"full":"Efik"},"egy":{"full":"Egyptian"},"eka":{"full":"Ekajuk"},"elx":{"full":"Elamite"},"eng":{"full":"US English"},"enm":{"full":"English"},"ang":{"full":"English"},"myv":{"full":"Erzya"},"epo":{"full":"Esperanto"},"est":{"full":"Estonian","speak":{"isExist":false}},"ewe":{"full":"Ewe"},"ewo":{"full":"Ewondo"},"fan":{"full":"Fang"},"fat":{"full":"Fanti"},"fao":{"full":"Faroese"},"fij":{"full":"Fijian"},"fil":{"full":"Pilipino; Filipino"},"fin":{"full":"Finnish"},"fiu":{"full":"Finno-Ugrian"},"fon":{"full":"Fon"},"fre":{"full":"French"},"fra":{"full":"French"},"frm":{"full":"French"},"fro":{"full":"French"},"fry":{"full":"Frisian"},"fur":{"full":"Friulian"},"ful":{"full":"Fulah"},"gaa":{"full":"Ga"},"gla":{"full":"Scottish Gaelic; Gaelic"},"glg":{"full":"Gallegan"},"lug":{"full":"Ganda"},"gay":{"full":"Gayo"},"gba":{"full":"Gbaya"},"gez":{"full":"Geez"},"geo":{"full":"Georgian"},"kat":{"full":"Georgian","speak":{"isExist":false}},"ger":{"full":"German"},"deu":{"full":"Deutsch"},"nds":{"full":"Saxon, Low; German, Low; Low Saxon; Low German"},"gmh":{"full":"German"},"goh":{"full":"German"},"gem":{"full":"Germanic"},"kik":{"full":"Kikuyu; Gikuyu"},"gil":{"full":"Gilbertese"},"gon":{"full":"Gondi"},"gor":{"full":"Gorontalo"},"got":{"full":"Gothic"},"grb":{"full":"Grebo"},"grc":{"full":"Greek"},"gre":{"full":"Greek"},"ell":{"full":"Greek"},"kal":{"full":"Kalaallisut; Greenlandic","speak":{"optional":"dan"}},"grn":{"full":"Guarani","speak":{"optional":"spa"}},"guj":{"full":"Gujarati"},"gwi":{"full":"Gwich’in"},"hai":{"full":"Haida"},"hat":{"full":"Haitian Creole; Haitian"},"hau":{"full":"Hausa"},"haw":{"full":"Hawaiian"},"heb":{"full":"Hebrew","speak":{"isExist":false}},"her":{"full":"Herero"},"hil":{"full":"Hiligaynon"},"him":{"full":"Himachali"},"hin":{"full":"Hindi"},"hmo":{"full":"Hiri Motu"},"hit":{"full":"Hittite"},"hmn":{"full":"Hmong"},"hun":{"full":"Hungarian"},"hup":{"full":"Hupa"},"iba":{"full":"Iban"},"ice":{"full":"Icelandic"},"isl":{"full":"Icelandic"},"ido":{"full":"Ido"},"ibo":{"full":"Igbo"},"ijo":{"full":"Ijo"},"ilo":{"full":"Iloko"},"smn":{"full":"Inari Sami"},"inc":{"full":"Indic"},"ine":{"full":"Indo-European"},"ind":{"full":"Indonesian"},"inh":{"full":"Ingush"},"ina":{"full":"Interlingua"},"ile":{"full":"Interlingue"},"iku":{"full":"Inuktitut"},"ipk":{"full":"Inupiaq"},"ira":{"full":"Iranian","speak":{"optional":"ara"}},"gle":{"full":"Irish"},"mga":{"full":"Irish"},"sga":{"full":"Irish"},"iro":{"full":"Iroquoian"},"ita":{"full":"Italian"},"jpn":{"full":"Japanese"},"jav":{"full":"Javanese"},"jrb":{"full":"Judeo-Arabic"},"jpr":{"full":"Judeo-Persian"},"kbd":{"full":"Kabardian"},"kab":{"full":"Kabyle"},"kac":{"full":"Kachin"},"xal":{"full":"Kalmyk"},"kam":{"full":"Kamba"},"kan":{"full":"Kannada"},"kau":{"full":"Kanuri"},"krc":{"full":"Karachay-Balkar"},"kaa":{"full":"Kara-Kalpak"},"kar":{"full":"Karen"},"kas":{"full":"Kashmiri"},"csb":{"full":"Kashubian"},"kaw":{"full":"Kawi"},"kaz":{"full":"Kazakh"},"kha":{"full":"Khasi"},"khm":{"full":"Khmer"},"khi":{"full":"Khoisan"},"kho":{"full":"Khotanese"},"kmb":{"full":"Kimbundu"},"kin":{"full":"Kinyarwanda"},"kir":{"full":"Kirghiz"},"tlh":{"full":"Klingon"},"kom":{"full":"Komi"},"kon":{"full":"Kongo"},"kok":{"full":"Konkani"},"kor":{"full":"Korean"},"kos":{"full":"Kosraean"},"kpe":{"full":"Kpelle"},"kri":{"full":"Krio"},"kro":{"full":"Kru"},"kum":{"full":"Kumyk"},"kur":{"full":"Kurdish"},"kru":{"full":"Kurukh"},"kut":{"full":"Kutenai"},"kua":{"full":"Kwanyama, Kuanyama"},"lad":{"full":"Ladino"},"lah":{"full":"Lahnda"},"lam":{"full":"Lamba"},"lao":{"full":"Lao"},"lat":{"full":"Latin"},"lav":{"full":"Latvian"},"lez":{"full":"Lezghian"},"lim":{"full":"Limburgan; Limburger; Limburgish"},"lin":{"full":"Lingala"},"lit":{"full":"Lithuanian"},"jbo":{"full":"Lojban"},"dsb":{"full":"Lower Sorbian"},"loz":{"full":"Lozi"},"lub":{"full":"Luba-Katanga"},"lua":{"full":"Luba-Lulua"},"lui":{"full":"Luiseno"},"smj":{"full":"Lule Sami"},"lun":{"full":"Lunda"},"luo":{"full":"Luo"},"lus":{"full":"Lushai"},"ltz":{"full":"Luxembourgish; Letzeburgesch"},"mac":{"full":"Macedonian"},"mkd":{"full":"Macedonian"},"mad":{"full":"Madurese"},"mag":{"full":"Magahi"},"mai":{"full":"Maithili"},"mak":{"full":"Makasar"},"mlg":{"full":"Malagasy"},"may":{"full":"Malay"},"msa":{"full":"Malay","speak":{"optional":"eng"}},"mal":{"full":"Malayalam"},"mlt":{"full":"Maltese"},"mnc":{"full":"Manchu"},"mdr":{"full":"Mandar"},"man":{"full":"Mandingo"},"mni":{"full":"Manipuri "},"mno":{"full":"Manobo"},"glv":{"full":"Manx"},"mao":{"full":"Maori"},"mri":{"full":"Maori"},"mar":{"full":"Marathi"},"chm":{"full":"Mari"},"mah":{"full":"Marshallese"},"mwr":{"full":"Marwari"},"mas":{"full":"Masai"},"myn":{"full":"Mayan"},"mey":{"full":"Hassaniyya","speak":{"optional":"ara"}},"men":{"full":"Mende"},"mic":{"full":"Micmac; Mi'kmaq"},"min":{"full":"Minangkabau"},"mwl":{"full":"Mirandese"},"moh":{"full":"Mohawk"},"mdf":{"full":"Moksha"},"mol":{"full":"Moldavian"},"mkh":{"full":"Mon-Khmer"},"lol":{"full":"Mongo"},"mon":{"full":"Mongolian"},"mos":{"full":"Mossi"},"mul":{"full":"Multiple"},"mun":{"full":"Munda"},"nah":{"full":"Nahuatl"},"nau":{"full":"Nauru"},"nav":{"full":"Navajo; Navaho"},"nde":{"full":"North Ndebele"},"nbl":{"full":"South Ndebele"},"ndo":{"full":"Ndonga"},"nap":{"full":"Neapolitan"},"new":{"full":"Nepal Bhasa; Newari"},"nep":{"full":"Nepali"},"nia":{"full":"Nias"},"nic":{"full":"Niger-Kordofanian"},"ssa":{"full":"Nilo-Saharan"},"niu":{"full":"Niuean"},"nog":{"full":"Nogai"},"non":{"full":"Norse"},"nai":{"full":"North American Indian"},"sme":{"full":"Northern Sami"},"nso":{"full":"Sotho, Northern; Pedi; Sepedi"},"nor":{"full":"Norwegian"},"nub":{"full":"Nubian"},"nym":{"full":"Nyamwezi"},"nyn":{"full":"Nyankole"},"nno":{"full":"Nynorsk, Norwegian; Norwegian Nynorsk"},"nyo":{"full":"Nyoro"},"nzi":{"full":"Nzima"},"oci":{"full":"Provençal; Occitan (post 1500) "},"oji":{"full":"Ojibwa"},"chu":{"full":"Old Slavonic; Church Slavonic; Old Bulgarian; Church Slavic; Old Church Slavonic "},"ori":{"full":"Oriya"},"orm":{"full":"Oromo"},"osa":{"full":"Osage"},"oss":{"full":"Ossetic; Ossetian"},"oto":{"full":"Otomian"},"pal":{"full":"Pahlavi"},"pau":{"full":"Palauan"},"pli":{"full":"Pali"},"pam":{"full":"Pampanga"},"pag":{"full":"Pangasinan"},"pan":{"full":"Punjabi; Panjabi"},"pap":{"full":"Papiamento"},"paa":{"full":"Papuan"},"per":{"full":"Persian"},"fas":{"full":"Persian"},"peo":{"full":"Persian"},"phn":{"full":"Phoenician"},"pon":{"full":"Pohnpeian"},"pol":{"full":"Polish"},"por":{"full":"Portuguese"},"pra":{"full":"Prakrit"},"pro":{"full":"Provençal"},"pus":{"full":"Pushto","speak":{"optional":"ara"}},"que":{"full":"Quechua"},"roh":{"full":"Raeto-Romance"},"raj":{"full":"Rajasthani"},"rap":{"full":"Rapanui"},"rar":{"full":"Rarotongan"},"roa":{"full":"Romance"},"rum":{"full":"Romanian"},"ron":{"full":"Romanian"},"rom":{"full":"Romany"},"run":{"full":"Rundi"},"rus":{"full":"Russian"},"sal":{"full":"Salishan"},"sam":{"full":"Samaritan Aramaic"},"smi":{"full":"Sami"},"smo":{"full":"Samoan"},"sad":{"full":"Sandawe"},"sag":{"full":"Sango"},"san":{"full":"Sanskrit"},"sat":{"full":"Santali"},"srd":{"full":"Sardinian"},"sas":{"full":"Sasak"},"sco":{"full":"Scots"},"sel":{"full":"Selkup"},"sem":{"full":"Semitic"},"scc":{"full":"Serbian"},"srp":{"full":"Serbian"},"srr":{"full":"Serer"},"shn":{"full":"Shan"},"sna":{"full":"Shona"},"iii":{"full":"Sichuan Yi"},"scn":{"full":"Sicilian"},"sid":{"full":"Sidamo"},"sgn":{"full":"Sign"},"bla":{"full":"Siksika"},"snd":{"full":"Sindhi"},"sin":{"full":"Sinhalese; Sinhala"},"sit":{"full":"Sino-Tibetan"},"sio":{"full":"Siouan"},"sms":{"full":"Skolt Sami"},"den":{"full":"Slave"},"sla":{"full":"Slavic"},"slo":{"full":"Slovak"},"slk":{"full":"Slovak"},"slv":{"full":"Slovenian"},"sog":{"full":"Sogdian"},"som":{"full":"Somali"},"son":{"full":"Songhai"},"snk":{"full":"Soninke"},"wen":{"full":"Sorbian"},"sot":{"full":"Sotho, Southern"},"sai":{"full":"South American Indian"},"sma":{"full":"Southern Sami"},"suk":{"full":"Sukuma"},"sux":{"full":"Sumerian"},"sun":{"full":"Sundanese"},"sus":{"full":"Susu"},"swa":{"full":"Swahili"},"ssw":{"full":"Swati"},"swe":{"full":"Swedish"},"syr":{"full":"Syriac"},"tgl":{"full":"Tagalog"},"tah":{"full":"Tahitian"},"tai":{"full":"Tai"},"tgk":{"full":"Tajik"},"tmh":{"full":"Tamashek"},"tam":{"full":"Tamil"},"tat":{"full":"Tatar"},"tel":{"full":"Telugu"},"ter":{"full":"Tereno"},"tet":{"full":"Tetum"},"tha":{"full":"Thai"},"tib":{"full":"Tibetan"},"bod":{"full":"Tibetan"},"tig":{"full":"Tigre"},"tir":{"full":"Tigrinya"},"tem":{"full":"Timne"},"tiv":{"full":"Tiv"},"tli":{"full":"Tlingit"},"tpi":{"full":"Tok Pisin"},"tkl":{"full":"Tokelau"},"tog":{"full":"Tonga"},"ton":{"full":"Tonga"},"tsi":{"full":"Tsimshian"},"tso":{"full":"Tsonga"},"tsn":{"full":"Tswana"},"tum":{"full":"Tumbuka"},"tup":{"full":"Tupi"},"tur":{"full":"Turkish"},"ota":{"full":"Turkish"},"tuk":{"full":"Turkmen"},"tvl":{"full":"Tuvalu"},"tyv":{"full":"Tuvinian"},"twi":{"full":"Twi"},"udm":{"full":"Udmurt"},"uga":{"full":"Ugaritic"},"uig":{"full":"Uyghur; Uighur"},"ukr":{"full":"Ukrainian"},"umb":{"full":"Umbundu"},"hsb":{"full":"Upper Sorbian"},"urd":{"full":"Urdu"},"uzb":{"full":"Uzbek"},"vai":{"full":"Vai"},"ven":{"full":"Venda"},"vie":{"full":"Vietnamese"},"vol":{"full":"Volapük"},"vot":{"full":"Votic"},"wak":{"full":"Wakashan"},"wal":{"full":"Walamo"},"wln":{"full":"Walloon"},"war":{"full":"Waray"},"was":{"full":"Washo"},"wel":{"full":"Welsh"},"cym":{"full":"Welsh"},"wol":{"full":"Wolof"},"xho":{"full":"Xhosa"},"sah":{"full":"Yakut"},"yao":{"full":"Yao"},"yap":{"full":"Yapese"},"yid":{"full":"Yiddish"},"yor":{"full":"Yoruba"},"ypk":{"full":"Yupik"},"znd":{"full":"Zande"},"zap":{"full":"Zapotec"},"zen":{"full":"Zenaga"},"zul":{"full":"Zulu"},"zun":{"full":"Zuni"}};
    this.lyrics = null;
    this.reloadMenus = () => null;

    this.videoElement = document.querySelector('div.viewer div.players video');
    this.audioElement = document.querySelector('div.viewer div.players div.audio audio');
    this.audioDiv = document.querySelector('div.viewer div.players div.audio');
    this.fileName = document.querySelector('div.viewer div.filename');
    this.imageElement = document.querySelector('div.viewer div.players img');
    this.imageFakeVideo = document.createElement('video');
    this.iframeElement = document.querySelector('div.viewer div.players iframe');

    this.players = document.querySelector('div.viewer div.players').children;
    this.timeInput = document.querySelector('div.controls div.time input');
    this.volumeInput = document.querySelector('div.controls div.options div.volume input');
    this.timeIndicators = {
      time: document.querySelector('div.controls div.time span.time'),
      total_time: document.querySelector('div.controls div.time span.total-time'),
    };

    this.controls = document.querySelector('div.viewer div.controls');
    this.controls_picture_in_picture = document.querySelector('div.viewer div.controls div.options div.pip');
    this.loop = 'noloop';

    this.midiPlayer = null;

    this.playlist_ = []

    this.playWhenLoaded = playWhenLoaded;

    this.videoElement.addEventListener("ended", function (){
      document.querySelector('div.viewer div.controls div.playpause .play').classList.remove('hidden');
      document.querySelector('div.viewer div.controls div.playpause .pause').classList.remove('hidden');
      document.querySelector('div.viewer div.controls div.playpause .pause').classList.add('hidden');
    });

    this.audioElement.addEventListener("ended", function (){
      document.querySelector('div.viewer div.controls div.playpause .play').classList.remove('hidden');
      document.querySelector('div.viewer div.controls div.playpause .pause').classList.remove('hidden');
      document.querySelector('div.viewer div.controls div.playpause .pause').classList.add('hidden');
    });

    this.loopOff();

    const addTBodyLine = (element, line) => {
      let tr = document.createElement('tr');
      var th = null;
      var i = 0;
      var j = 0;
      for (i=0; i < line.length; i++){
        th = document.createElement('th');
        th.innerHTML = line[i].content;
        for (j=0; j < Object.keys(line[i]).length; j++){
          if (Object.keys(line[i])[j] != 'content'){
            th[Object.keys(line[i])[j]] = line[i][Object.keys(line[i])[j]];
          }
        }
        tr.appendChild(th);
      }
      element.appendChild(tr);
    }

    const setTBodyContent = (element, content) => {
      var i = 0;
      for (i=0; i < content.length; i++){
        addTBodyLine(element, content[i]);
      }
    }

    this.table = {addLine: addTBodyLine, setContent: setTBodyContent};

    function autoToggleControls(e){
      const isDraggingSubtitles = () => {
        return (document.querySelector('.subtitles').getAttribute('align') == 'dragging')
      }

      const isOverSubElement = (e) => {
        try{
          return getQueryOfElement(e.target).includes('.controls');
        } catch {
          return false
        }
      } // FLAG

      if (!isDraggingSubtitles() && !isOverSubElement(e)){
        var fullscreen = 0;
  
        if (document.webkitIsFullScreen){
          fullscreen = 100;
        }
  
        if (window.outerHeight - e.clientY <= (300 - fullscreen)){
          document.querySelector('div.controls').classList.remove('hidden');
          document.querySelector('div.subtitles').classList.add('up');
        } else {
          document.querySelector('div.controls').classList.add('hidden');
          document.querySelector('div.subtitles').classList.remove('up');
        }
      } else {
        /* document.querySelector('div.controls').classList.add('hidden');
        document.querySelector('div.subtitles').classList.remove('up'); */
      }
    }

    document.addEventListener('mousemove', autoToggleControls);
    document.addEventListener('mousedown', autoToggleControls);
    document.addEventListener('mouseup', autoToggleControls);

    if (keyboardShortcuts){
      this.addKeyboardShortcuts();
    }

    this.setMode('video');

    this.dragElement('.subtitles');

    this.downloadVideoFrameCapture = () => {
    }

    document.addEventListener('load', function (){
      const rm = () => {
        try{
          reloadMenus();
        } catch {}
      };
  
      this.videoElement.videoElement.onloadeddata = rm;
    })
  }

  // Background functions
  blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  getPromiseFromEvent(item, event) {
    return new Promise((resolve) => {
      const listener = (e) => {
        item.removeEventListener(event, listener);
        resolve(e);
      }
      item.addEventListener(event, listener);
    })
  }

  if_then_else(condition, then_, else_){
    if (condition){
      return then_
    } else {
      return else_
    }
  }
  
  s2hms = (s, responseType = 'string') => {
    var hms = '';
    var h, m, s_ = 0;
  
    if (s / 3600 >= 1){
      h = String(s / 3600)
      if (h.includes('.')) h = h.split('.')[0]
      h = Number(h);
    }
  
    if ((s - (h*3600)) / 60 >= 1){
      m = String((s - (h*3600)) / 60)
      if (m.includes('.')) m = m.split('.')[0]
      m = Number(m);
    }
  
    if ((s - h*3600 - m*60) > 0){
      s_ = s - (h*3600 + m*60)
    }
  
    if (responseType == 'string'){
      return if_then_else(String(h).length == 0, '00', if_then_else(String(h).length == 1, '0', '')) + String(h) + ':' + if_then_else(String(m).length == 0, '00', if_then_else(String(m).length == 1, '0', '')) + String(m) + ':' + if_then_else(String(s_).includes('.'), if_then_else(String(s_).split('.')[0].length == 1, '0'), if_then_else(String(s_).length == 1, '0')) + String(s_);
    } else if (responseType == 'json'){
      return {h: h, m:m, s: s_}
    } else {
      throw Error('Invalid response type');
    }
  }

  // Keyboard shortcuts
  isKeyboardEventAltered(event){
    return (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
  }

  keyboardShortcuts(e) {
    const eval_code = (code) => {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerText = code;
      document.body.appendChild(script);
      document.body.removeChild(script);
      script.remove();
    }

    const isKeyboardEventAltered = (event) =>{
      return (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
    }

    const isSelectedElementAFeild = () => {
      return (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA')
    }
    
    if (e.key === 'f' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.toggleFullscreen();');
    } else if (e.key === 't' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.openAudioTracksMenu();');
    } else if (e.key === 't' & e.shiftKey & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.openVideoTracksMenu();');
    } else if (e.key === 'i' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.importFile();');
    } else if (e.key === 'c' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.takeCaptureOfVideoElementAtTime();');
    } else if (e.key === 'C' && e.shiftKey & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.takeCaptureOfVideoElementAtTime(Number(viewer.hms2s(prompt(ui_translator.getDialogInLanguage("vfc_custom")))));');
    } else if (e.key === 'F11' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.toggleFullscreen();');
    } else if (e.key === 'm' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.toggleMute();');
    } else if (e.key === 'l' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.toggleLoop();');
    } else if (e.key === ' ' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.toggleLecture();');
    } else if (e.key === 'ArrowLeft' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      if (e.repeat){
        e.preventDefault();
        eval_code('viewer.goBackward2();');
      } else {
        e.preventDefault();
        eval_code('viewer.goBackward();');
      }
    } else if (e.key === 'ArrowRight' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      if (e.repeat){
        e.preventDefault();
        eval_code('viewer.goForeward2();');
      } else {
        e.preventDefault();
        eval_code('viewer.goForeward();');
      }
    } else if (e.key === 'ArrowUp' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      if (e.repeat){
        e.preventDefault();
        eval_code('viewer.volumeUp2();');
      } else {
        e.preventDefault();
        eval_code('viewer.volumeUp();');
      }
    } else if (e.key === 'ArrowDown' & !isKeyboardEventAltered(e) & !isSelectedElementAFeild()) {
      if (e.repeat){
        e.preventDefault();
        eval_code('viewer.volumeDown2();');
      } else {
        e.preventDefault();
        eval_code('viewer.volumeDown();');
      }
    } else if ((e.keyCode === 219) & e.ctrlKey & e.shiftKey & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('viewer.togglePictureInPicture();'); // new AppWindow().turnIntoApp("#settings-app");
    } else if ((e.key === 's') & e.ctrlKey & !isSelectedElementAFeild()) {
      e.preventDefault();
      eval_code('windows.toggleAppVisibility("#settings-app")');
    } else if ((e.key === 'l') & e.ctrlKey & !isSelectedElementAFeild()) {
      e.preventDefault();
    }
  }

  addKeyboardShortcuts() {
    document.addEventListener("keydown", this.keyboardShortcuts);
  }

  removeKeyboardShortcuts() {
    document.removeEventListener("keydown", this.keyboardShortcuts);
  }

  setOrientation(orientation){
    if (orientation == 'vertical'){
      this.videoElement.style.height = '-webkit-fill-available';
      this.videoElement.style.width = '';
      this.imageElement.style.height = '-webkit-fill-available';
      this.imageElement.style.width = '';
    } else if (orientation == 'horizontal') {
      this.videoElement.style.height = '';
      this.videoElement.style.width = '-webkit-fill-available';
      this.imageElement.style.height = '';
      this.imageElement.style.width = '-webkit-fill-available';
    }
  }

  getSource(){
    switch (this.mode){
      case 'video':
        return this.videoElement.children[0].src;
        break
      case 'image':
        return this.imageElement.src;
        break
      case 'audio':
        return this.audioElement.src;
        break
      default:
        return null
        break
    }
  }

  async refreshMediaView(url = this.getSource()){
    var infos = await this.getPlayingMediaInfos();
    if (infos.height >= infos.width){
      this.setOrientation('vertical');
    } else if (infos.height < infos.width){
      this.setOrientation('horizontal');
    }
  }

  // Audio
  setAudioSource(url) {
    this.audioElement.src = url;
    this.audioElement.load();
    if (this.playWhenLoaded) this.play()
  }

  isPlayableByAudioElement(file) {
    if (file.type.split('/')[0] == 'audio'){
      var acceptedAudioFormats = ['flac', 'm4a', 'wav', 'weba', 'webm', 'mp3', 'ogg'];
      return acceptedAudioFormats.includes(file.name.split('.').pop());
    } else {
      return false;
    }
  }

  isMidi(file) {
    return file.type == 'audio/mid';
  }

  async importAudioFile() {
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    var input = document.createElement('input');
    input.type = "file";
    input.accept = "audio/*";
    input.click();
    await this.getPromiseFromEvent(input, 'change');
    // document.querySelector('div.viewer div.loading').style.display = '';
    var file = input.files[0];
    // document.querySelector('div.viewer div.loading div.content h3 span').innerText = file.name;
    var b64 = URL.createObjectURL(file);
    if (this.isPlayableByAudioElement(file)){
      this.setAudioSource(b64);
      // await this.getPromiseFromEvent(this.audioElement, 'loadeddata');
      // document.querySelector('div.viewer div.loading').style.display = 'none';
    } else if (this.isMidi(file)){
      if (this.midiPlayer == null){
        try{
          this.installMidiPlayer();
        } catch {
          alert("MIDIjs could not be imported.");
        }
      }

      // document.querySelector('div.viewer div.loading').style.display = 'none';
    }
    await delay(0.2);
    if (this.playWhenLoaded){
      this.play();
      this.refreshTimeIndicators();
    }
    this.reloadMenus();
    this.showText(file.name);
    while (!this.isPaused()){
      if (!this.timeInput.matches(':active')){
        this.refreshTimeInput();
      }
      this.refreshTimeIndicators();
      await delay(0.00005);
    }
  }

  async showText(text){
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    this.fileName.children[0].innerText = text;
    this.fileName.classList.toggle('hidden');
    await delay(3);
    this.fileName.classList.toggle('hidden');
  }

  installMidiPlayer() {
    try {
      fetch('https://www.midijs.net/lib/midi.js');
      this.midiPlayer.scriptElement = document.createElement('script');
      this.midiPlayer.scriptElement.type = 'text/javascript';
      this.midiPlayer.scriptElement.src = 'https://www.midijs.net/lib/midi.js';
      document.body.appendChild(this.midiPlayer.scriptElement);
      this.midiPlayer = MIDIjs;
    } catch {
      throw new Error('Could not access "https://www.midijs.net/lib/midi.js".');
    }
  }

  // Video
  async setVideoSource(url) {
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    this.videoElement.children[0].src = url;
    this.refreshMediaView();
    this.videoElement.load();
    await delay(1);
    reloadMenus();
    if (this.playWhenLoaded) this.play()
  }

  async importVideoFile() {
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    var input = document.createElement('input');
    input.type = "file";
    input.accept = "video/*";
    input.click();
    await this.getPromiseFromEvent(input, 'change');
    var file = input.files[0];
    // document.querySelector('div.viewer div.loading').style.display = '';
    // document.querySelector('div.viewer div.loading div.content h3 span').innerText = file.name;
    var b64 = URL.createObjectURL(file);
    this.setVideoSource(b64);
    await this.getPromiseFromEvent(this.videoElement, 'loadstart');
    this.reloadMenus();
    // document.querySelector('div.viewer div.loading').style.display = 'none';
    if (this.playWhenLoaded){
      this.play();
      this.refreshTimeIndicators();
    }
    this.reloadMenus();
    this.showText(file.name);
    while (!this.isPaused()){
      if (!this.timeInput.matches(':active')){
        this.refreshTimeInput();
      }
      this.refreshTimeIndicators();
      await delay(0.00005);
    }
  }

  async importLyricsFile() {
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    var input = document.createElement('input');
    input.type = "file";
    input.click();
    await this.getPromiseFromEvent(input, 'change');
    var file = input.files[0];
    this.lyrics = this.readLRCLyrics(await file.text());
    this.fileName.children[0].innerText = 'Loaded lyrics';
    this.fileName.classList.toggle('hidden');
    await delay(3);
    this.fileName.classList.toggle('hidden');
  }

  switchVideoToPC(){
    this.videoElement.style.width = '-webkit-fill-available';
    this.videoElement.style.height = '';
  }

  switchVideoToPhone(){
    this.videoElement.style.width = '';
    this.videoElement.style.height = window.outerHeight + 'px';
  }

  //// YouTube
  isYouTubeVideoURL(url){
    return url.includes('youtube.com/embed') || url.includes('youtu.be') || url.includes('youtube.com/watch?') || url.includes('youtube.com/shorts');
  }

  getIdOfYouTubeVideoURL(url){
    const itemOfFromString = (item, from, splitby) => {
      return String(from).split(String(splitby))[(Number(item) - 1)] || '';
    }
    
    if (url.includes('youtube.com/embed')){ // YouTube Embed Video
      return itemOfFromString(2, itemOfFromString(1, url, '?'), 'youtube.com/embed/');
    } else if (url.includes('youtu.be')){ // youtu.be short link
      return itemOfFromString(2, itemOfFromString(1, url, '?'), 'youtu.be/');
    } else if (url.includes('youtube.com/watch?')){ // youtube.com/watch?v={ID} - Basic YouTube url
      const queryString = '?' + itemOfFromString(2, url, '?');
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get('v');
    } else if (url.includes('youtube.com/shorts')){ // YouTube Shorts
      return url.replace('youtube.com/shorts/', '');
    } else {
      return null
    }
  }

  // Image
  setImageSource(url) {
    this.imageElement.src = url;
    this.refreshMediaView();
    if (this.playWhenLoaded) this.play()
  }

  async importImageFile() {
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    var input = document.createElement('input');
    input.type = "file";
    input.accept = "image/*";
    input.click();
    await this.getPromiseFromEvent(input, 'change');
    var file = input.files[0];
    var b64 = URL.createObjectURL(file);
    this.setImageSource(b64);
    if (this.playWhenLoaded){
      this.play();
    }
    this.reloadMenus();
    this.fileName.children[0].innerText = file.name;
    await delay(0.2);
    while (!this.isPaused()){
      if (!this.timeInput.matches(':active')){
        this.refreshTimeInput();
      }
      this.refreshTimeIndicators();
      await delay(0.00005);
    }
    this.fileName.classList.toggle('hidden');
    await delay(3);
    this.fileName.classList.toggle('hidden');
  }

  // Both
  importFile(){
    if (this.getMode() == 'video'){
      this.importVideoFile();
    } else if (this.getMode() == 'audio'){
      this.importAudioFile();
    } else if (this.getMode() == 'image'){
      this.importImageFile();
    }
    this.reloadMenus();
  }

  play() {
    this.getElementOfMode().play();
    document.querySelector('div.viewer div.controls div.playpause .play').classList.remove('hidden');
    document.querySelector('div.viewer div.controls div.playpause .pause').classList.remove('hidden');
    document.querySelector('div.viewer div.controls div.playpause .play').classList.add('hidden');
  }

  pause() {
    this.getElementOfMode().pause();
    document.querySelector('div.viewer div.controls div.playpause .play').classList.remove('hidden');
    document.querySelector('div.viewer div.controls div.playpause .pause').classList.remove('hidden');
    document.querySelector('div.viewer div.controls div.playpause .pause').classList.add('hidden');
  }

  isPaused() {
    return this.getElementOfMode().paused;
  }

  goBackward(x = 5) {
    x = x * this.getSpeed();
    this.getElementOfMode().currentTime = (this.getElementOfMode().currentTime - x);
    this.refreshTimeInput();
    this.refreshTimeIndicators();
  }

  goBackward2(x = 10) {
    x = x * this.getSpeed();
    this.getElementOfMode().currentTime = (this.getElementOfMode().currentTime - x);
    this.refreshTimeInput();
    this.refreshTimeIndicators();
  }

  goForeward(x = 5) {
    x = x * this.getSpeed();
    this.getElementOfMode().currentTime = (this.getElementOfMode().currentTime + x);
    this.refreshTimeInput();
    this.refreshTimeIndicators();
  }

  goForeward2(x = 10) {
    x = x * this.getSpeed();
    this.getElementOfMode().currentTime = (this.getElementOfMode().currentTime + x);
    this.refreshTimeInput();
    this.refreshTimeIndicators();
  }

  toggleLecture() {
    if (this.isPaused()){
      this.play();
    } else {
      this.pause();
    }
  }

  refreshSound() {
    this.getElementOfMode().volume = Number(this.volumeInput.value) / 100;
    if (Number(this.volumeInput.value) >= 75){
      document.querySelector('div.controls div.options div.volume svg g g path.c').style.display = '';
    } else {
      document.querySelector('div.controls div.options div.volume svg g g path.c').style.display = 'none';
    }

    if (Number(this.volumeInput.value) >= 25){
      document.querySelector('div.controls div.options div.volume svg g g path.b').style.display = '';
    } else {
      document.querySelector('div.controls div.options div.volume svg g g path.b').style.display = 'none';
    }
  }

  getMode() {
    return this.mode;
  }

  setMode(mode) {
    this.mode = mode;
    this.videoElement.pause();
    this.audioElement.pause();

    this.videoElement.style.display = 'none';
    this.audioDiv.style.display = 'none';
    this.imageElement.style.display = 'none';
    this.controls_picture_in_picture.style.display = 'none';
    this.iframeElement.style.display = 'none';

    if (mode == 'video'){
      this.videoElement.style.display = '';
      this.controls_picture_in_picture.style.display = '';
    } else if (mode == 'image'){
      this.imageElement.style.display = '';
    } else if (mode == 'audio'){
      this.audioDiv.style.display = '';
    } else if (mode == 'iframe'){
      this.iframeElement.style.display = '';
    }
  }

  getElementOfMode(mode=this.getMode()) {
    if (mode == 'video'){
      return this.videoElement;
    } else if (mode == 'image'){
      return this.imageFakeVideo;
    } else if (mode == 'audio'){
      return this.audioElement;
    }
  }

  async getTypeOfURL(url){
    if (this.isYouTubeVideoURL(url)){
      return 'iframe'
    }

    var blob = await fetch(url).then((r) => r.blob());
    if (blob.type == ''){
      if (url.split('/')[(url.split('/').length - 1)].includes('.')){
        return url.split('.').pop();
      }
      return url.split('/')[(url.split('/').length - 1)];
    }
    return blob.type.split('/')[0];
  }

  setIframeSource(url){
    this.iframeElement.src = url;
  }

  getIframeType(url){
    if (this.isYouTubeVideoURL(url)){
      return 'youtube'
    }
  }

  async openNetworkFlux(url) {
    var type = await this.getTypeOfURL(url);
    this.pause()
    this.setMode(type);
    if (type == 'iframe'){
      if (this.getIframeType(url)){
        this.setIframeSource('https://www.youtube.com/embed/' + this.getIdOfYouTubeVideoURL(url));
      }
    } else if (type == 'image'){
      this.setImageSource(url);
    } else if (type == 'video'){
      this.setVideoSource(url);
    } else if (type == 'audio'){
      this.setAudioSource(url);
    }
  }

  fullscreenOn() {
    try{
      this.viewer.webkitRequestFullScreen();
      document.querySelectorAll('div.controls div.options div.fullscreen svg').forEach(element => {element.classList.toggle('hidden')});
    } catch {
      // Guess we could't enter to fullscreen
    }
  }

  fullscreenOff() {
    document.querySelectorAll('div.controls div.options div.fullscreen svg').forEach(element => {element.classList.toggle('hidden')})
    try {
      document.webkitExitFullscreen();
    } catch {
      try {
        document.webkitCancelFullScreen();
      } catch {
        try {
          document.exitFullscreen();
        } catch {
          // Guess we could't exit fullscreen
          document.querySelectorAll('div.controls div.options div.fullscreen svg').forEach(element => {element.classList.toggle('hidden')})
        }
      }
    }
  }

  isFullscreen() {
    return document.webkitIsFullScreen;
  }

  toggleFullscreen() {
    if (this.isFullscreen()){
      this.fullscreenOff();
    } else {
      this.fullscreenOn();
    }
  }

  setFullscreen(value) {
    if (value){
      this.fullscreenOn();
    } else {
      this.fullscreenOff();
    }
  }

  pictureInPictureEnabled() {
    return document.pictureInPictureEnabled;
  }

  enablePictureInPicture() {
    document.pictureInPictureEnabled = true;
  }

  disablePictureInPicture() {
    document.pictureInPictureEnabled = false;
  }

  pictureInPictureOn() {
    if ((this.getMode() == 'video') & (this.pictureInPictureEnabled())){
      try {
        this.getElementOfMode().requestPictureInPicture();
      } catch {
        // Guess PIP mode is not available
      }
    }
  }
  
  pictureInPictureOff() {
    try {
      document.exitPictureInPicture();
    } catch {
      // Guess we could not exit PIP
    }
  }

  isPictureInPicture() {
    return document.pictureInPictureElement != null;
  }

  togglePictureInPicture(){
    if (this.isPictureInPicture()){
      this.pictureInPictureOff();
    } else {
      this.pictureInPictureOn();
    }
  }

  setSpeed(speed) {
    this.getElementOfMode().playbackRate = speed;
  }

  getSpeed() {
    return this.getElementOfMode().playbackRate;
  }

  getLoop() {
    return this.loop;
  }

  loopThis() {
    this.getElementOfMode().loop = true;
    this.setLoop('loopone');
    document.querySelector('div.controls div.options div.loop svg g g text tspan').style.display = '';
    document.querySelector('div.controls div.options div.loop svg g g g.arrow').setAttribute("stroke-width", 24);
  }

  loopOff() {
    this.getElementOfMode().loop = false;
    this.setLoop('noloop');
    document.querySelector('div.controls div.options div.loop svg g g text tspan').style.display = 'none';
    document.querySelector('div.controls div.options div.loop svg g g g.arrow').setAttribute("stroke-width", 12);
  }

  setLoop(loop) {
    this.loop = loop;
  }

  toggleLoop() {
    if (this.getLoop() == 'noloop'){
      this.loopThis();
    } else {
      this.loopOff();
    }
  }

  muteOn() {
    this.getElementOfMode().muted = true;
    this.volumeInput.disabled = true;
    document.querySelector('div.controls div.options div.volume svg g g g.vol').style.display = 'none';
  }

  muteOff() {
    this.getElementOfMode().muted = false;
    this.volumeInput.disabled = false;
    document.querySelector('div.controls div.options div.volume svg g g g.vol').style.display = '';
  }

  isMute() {
    return this.getElementOfMode().muted;
  }

  toggleMute() {
    if (this.isMute()){
      this.muteOff();
    } else {
      this.muteOn();
    }
  }

  volumeUp() {
    this.setVolume(Number(this.getVolume()) + 5);
  }

  volumeUp2() {
    this.setVolume(Number(this.getVolume()) + 10);
  }

  volumeDown() {
    this.setVolume(Number(this.getVolume()) - 5);
  }

  volumeDown2() {
    this.setVolume(Number(this.getVolume()) - 10);
  }

  setVolume(value){
    if (value == 'custom'){
      value = Number(prompt(ui_translator.getDialogInLanguage('set_volume_to'))); // translate
    }

    if (this.isMute()){
      this.volumeInput.disabled = false;
      this.volumeInput.value = value;
      this.volumeInput.disabled = true;
    } else {
      this.volumeInput.value = value;
      this.refreshSound();
    }
  }

  getVolume(){
    return this.volumeInput.value;
  }

  refreshElementTime() {
    try{
      this.getElementOfMode().currentTime = Number(this.timeInput.value) * this.getElementOfMode().duration / 100000;
    } catch {}
  }

  refreshTimeInput() {
    this.refreshMediaView();
    this.timeInput.value = this.getElementOfMode().currentTime / this.getElementOfMode().duration * 100000;
  }

  refreshTimeIndicators() {
    const seconds_to_hms = (seconds) => {
      var hms = new Date(seconds * 1000).toISOString().slice(11, 19);
      return {h: hms.split(':')[0], m: hms.split(':')[1], s: hms.split(':')[2]}
    }

    if (this.getElementOfMode().duration < 3600){
      var hms = seconds_to_hms(this.getElementOfMode().duration);
      this.timeIndicators.total_time.innerText = hms.m + ':' + hms.s;
    } else {
      var hms = seconds_to_hms(this.getElementOfMode().duration);
      this.timeIndicators.total_time.innerText = hms.h + ':' + hms.m + ':' + hms.s;
    }

    if (this.getElementOfMode().duration < 3600){
      var hms = seconds_to_hms(this.getElementOfMode().currentTime);
      this.timeIndicators.time.innerText = hms.m + ':' + hms.s;
    } else {
      var hms = seconds_to_hms(this.getElementOfMode().currentTime);
      if (this.getElementOfMode().currentTime < 3600){
        this.timeIndicators.time.innerText = '00:' + hms.m + ':' + hms.s;
      } else {
        this.timeIndicators.time.innerText = hms.h + ':' + hms.m + ':' + hms.s;
      }
    }

    if ((this.lyrics != null) && (document.querySelector('.cc-menu input.visible').checked)){
      document.querySelector('.subtitles span').innerText = (this.lyrics.getLyricsForTimecode(this.getElementOfMode().currentTime) || '');
    } else {
      document.querySelector('.subtitles span').innerText = '';
    }
  }

  hms2s(hms){
    const last = (list) => list[list.length - 1]
    var r = 0;
    if (hms.includes(':')){
      if (hms.split(':').length == 3){
        r += Number(hms.split(':')[0])*3600;
        r += Number(hms.split(':')[1])*60;
      } else if (hms.split(':').length == 2){
        r += Number(hms.split(':')[0])*60;
      }
      r += Number(last(hms.split(':')));
    } else {
      r += Number(hms)
    }
    return r;
  }

  readLRCLyrics(lrc){
    var result = {
      lyrics: {},
    };

    var lines = lrc.split('\n');
    
    var i = 0;
    
    for (i in lines){
      var selected_line = lines[i];
      if (typeof selected_line == 'string'){
        var selected_line_split_brackets = selected_line.split(']');
        if (selected_line_split_brackets[selected_line_split_brackets.length - 1] == ''){
          var selected_line_split = selected_line.split(':');
          result[selected_line_split[0].replace('[', '').replace(']', '')] = selected_line.split(selected_line_split[0].replace('[', '').replace(']', '') + ':')[1].replace('[', '').replace(']', '');
        } else {
          result.lyrics[selected_line_split_brackets[0].replace('[', '')] = selected_line_split_brackets[1];
        }
      }
    }

    result.getLyricsForTimecode = (s) => {
      var timecode = '';
      var timecodes = Object.keys(result.lyrics).map((key) => key);
      for (var i in timecodes){
        if (timecode == ''){
          if (this.hms2s(timecodes[(timecodes.length - 1 - i)]) <= s){
            timecode = timecodes[(timecodes.length - 1 - i)];
          }
        }
      }
      return result.lyrics[timecode];
    }
    
    return result;
  }

  async importLyricsURI(uri){
    let lyrics = await fetch(uri).then((r) => r.text());
    let parsed_lyrics = this.readLRCLyrics(lyrics);
    this.lyrics = parsed_lyrics;
  }

  dragElement(elmnt) {
    var elmnt_query = elmnt;
    elmnt = document.querySelector(elmnt);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.setAttribute('origin-width', elmnt.style.width);
    elmnt.setAttribute('origin-height', elmnt.style.height);
    elmnt.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      elmnt.setAttribute('align', 'dragging');
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
      if (elmnt.style.width == "100%"){
        elmnt.style.width = elmnt.getAttribute('origin-width');
        elmnt.style.height = elmnt.getAttribute('origin-height');
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      } else {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
        
      elmnt.setAttribute('previous-top', elmnt.style.top);
      elmnt.setAttribute('previous-left', elmnt.style.left);
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      elmnt.setAttribute('align', 'drag');
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  captureFrameVideoElement(element) {
    const canvasToBlob = (canvas) => {
      return new Promise((resolve) => canvas.toBlob(resolve));
    }
    var canvas = document.createElement("canvas");
    var video = element;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    return canvasToBlob(canvas);
  }

  showCapturePopup(blob){
    let blob_url = URL.createObjectURL(blob);
    console.log('Captured frame : ' + blob_url);
    document.querySelector('.vfc .popup .main .preview img').src = blob_url;
    this.downloadVideoFrameCapture = () => {
      let a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'WebMediaPlayer Video Capture.png';
      a.click();
    }
    document.querySelector('.vfc').classList.remove('hidden');
  }

  vfcSelected(element){
    if (element.value == 'custom'){
      this.takeCaptureOfVideoElementAtTime(Number(this.hms2s(prompt(ui_translator.getDialogInLanguage('vfc_custom')))));
    } else {
      this.takeCaptureOfVideoElementAtTime();
    }
    element.value = '';
  }

  async takeCaptureOfVideoElementAtTime(time = 'current'){
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    if (time == 'current'){
      this.showCapturePopup(await this.captureFrameVideoElement(this.videoElement));
    } else {
      var currentTime = this.getElementOfMode().currentTime;
      this.getElementOfMode().currentTime = time;
      await delay(0.2);
      this.showCapturePopup(await this.captureFrameVideoElement(this.videoElement));
      await delay(0.2);
      this.getElementOfMode().currentTime = currentTime;
    }
  }

  // Audio Tracks

  hasAudioTracks(){
    return document.createElement('video').audioTracks != undefined
  }

  getAudioTracks(){
    if (!this.hasAudioTracks) return null
    return this.videoElement.audioTracks;
  }

  playAudioTrackId(id){
    if (!this.hasAudioTracks) return null
    for (var i=0; i < this.videoElement.audioTracks.length; i++) {
      this.videoElement.audioTracks[i].enabled = false;
    }
    this.videoElement.audioTracks.getTrackById(id).enabled = true;
    this.toggleLecture();
    this.toggleLecture();
    this.goBackward(0.0000000000000000000000000000000000001);
  }

  playAudioTrackNo(no){
    if (!this.hasAudioTracks) return null
    this.playAudioTrackId(this.videoElement.audioTracks[no].id);
  }

  getAudioTracks(){
    if (!this.hasAudioTracks) return null
    let tracks = [];
    for (var i=0; i < this.videoElement.audioTracks.length; i++) {
      tracks.push(this.videoElement.audioTracks[i])
    }
    return tracks
  }

  getAudioTracksIDs(){
    if (!this.hasAudioTracks) return null
    return this.getAudioTracks().map((x) => {
      return x['id'] || null;
    });
  }

  getAudioTracksLanguages(){
    if (!this.hasAudioTracks) return null
    return this.getAudioTracks().map((x) => {
      return x['language'] || null
    });
  }

  getAudioTracksFullLanguages(){
    let languages = this.getAudioTracksLanguages();
    for (var i=0; i < languages.length; i++) {
      // console.log(languages[i]);
      if (['und', 'zxx', 'mul', 'qaa', 'mis'].includes(languages[i])){
        languages[i] = ui_translator.getDialogInLanguage('track_language_' + languages[i])
      } else {
        languages[i] = this.full_languages_name[languages[i]].full;
      }
      // console.log(languages[i]);
    }
    return languages
  }

  getAudioTracksAbbreviatedLanguages(){
    let languages = this.getAudioTracksLanguages();
    for (var i=0; i < languages.length; i++) {
      languages[i] = languages[i].substring(0, 2);
    }
    return languages
  }

  getAudioTracksLabels(){
    if (!this.hasAudioTracks) return null
    return this.getAudioTracks().map((x) => {
      return x['label'] || null;
    });
  }

  getAudioTracksNumber(){
    if (!this.hasAudioTracks) return null
    return this.videoElement.audioTracks.length;
  }

  getAudioTracksMenu(){
    let tracks = [];
    for (var i=0; i < this.getAudioTracks().length; i++) {
      let track = this.getAudioTracks()[i];
      tracks.push({
        "text": (track.label || ui_translator.getDialogInLanguage('track') + ' ' + String(i + 1)) + ' [' + this.getAudioTracksFullLanguages()[i] + ']',
        "events": {
          "click": function(e){
            viewer.playAudioTrackId(track.id);
          }
        }
      });
    }
    return {
      "text": ui_translator.getDialogInLanguage('audio_tracks'),
      "sub": tracks
    }
  }

  addOptionInSelectMenu(element = document.createElement('select'), option){
    let opt = document.createElement('option');
    opt.value = option.value;
    opt.innerText = option.text;
    element.appendChild(opt);
  }

  setSelectMenuOptions(element = document.createElement('select'), options){
    element.innerHTML = '';
    for (var i=0; i < options.length; i++){
      this.addOptionInSelectMenu(element, options[i]);
    }
    return element
  }

  refreshAudioTracksMenu(){
    let tracks = this.getAudioTracks();
    let opts = [];
    for (var i=0; i < tracks.length; i++){
      opts.push({
        text: (tracks[i].label || ui_translator.getDialogInLanguage('track') + ' ' + String(i + 1)) + ' [' + this.getAudioTracksFullLanguages()[i] + ']',
        value: tracks[i].id,
      })
    }
    this.setSelectMenuOptions(document.querySelector('.audiotracks .popup .main select'), opts);
    this.selectedAudioTrack(tracks[0].id);
  }

  openAudioTracksMenu(){
    document.querySelector('.audiotracks').classList.remove('hidden');
    this.refreshAudioTracksMenu();
  }

  selectedAudioTrack(value){
    document.querySelector('.audiotracks .popup .main .buttons span.track').innerText = document.querySelector('.audiotracks .popup .main select option[value="' + value + '"]').innerText;
    let track = this.videoElement.audioTracks.getTrackById(value);
    document.querySelector('.audiotracks .popup .main .label input').value = track.label;
    document.querySelector('.audiotracks .popup .main .id input').value = value;
    document.querySelector('.audiotracks .popup .main .language input').value = this.getAudioTracksFullLanguages()[this.getAudioTracksIDs().indexOf(value)];
  }

  playSelectedAudioTrack(){
    this.playAudioTrackId(document.querySelector('.audiotracks .popup .main select').value);
  }

  // Video tracks
  
  hasVideoTracks(){
    return document.createElement('video').videoTracks != undefined
  }

  getVideoTracks(){
    if (!this.hasVideoTracks) return null
    return this.videoElement.videoTracks;
  }

  playVideoTrackId(id){
    if (!this.hasVideoTracks) return null
    for (var i=0; i < this.videoElement.videoTracks.length; i++) {
      this.videoElement.videoTracks[i].selected = false;
    }
    this.videoElement.videoTracks.getTrackById(id).selected = true;
    this.toggleLecture();
    this.toggleLecture();
    this.goBackward(0.0000000000000000000000000000000000001);
  }

  playVideoTrackNo(no){
    if (!this.hasVideoTracks) return null
    this.playVideoTrackId(this.videoElement.videoTracks[no].id);
  }

  getVideoTracks(){
    if (!this.hasVideoTracks) return null
    let tracks = [];
    for (var i=0; i < this.videoElement.videoTracks.length; i++) {
      tracks.push(this.videoElement.videoTracks[i])
    }
    return tracks
  }

  getVideoTracksIDs(){
    if (!this.hasVideoTracks) return null
    return this.getVideoTracks().map((x) => {
      return x['id'] || null;
    });
  }

  getVideoTracksLanguages(){
    if (!this.hasVideoTracks) return null
    return this.getVideoTracks().map((x) => {
      return x['language'] || null
    });
  }

  getVideoTracksFullLanguages(){
    let languages = this.getVideoTracksLanguages();
    for (var i=0; i < languages.length; i++) {
      // console.log(languages[i]);
      if (['und', 'zxx', 'mul', 'qaa', 'mis'].includes(languages[i])){
        languages[i] = ui_translator.getDialogInLanguage('track_language_' + languages[i])
      } else {
        languages[i] = this.full_languages_name[languages[i]].full;
      }
      // console.log(languages[i]);
    }
    return languages
  }

  getVideoTracksAbbreviatedLanguages(){
    let languages = this.getVideoTracksLanguages();
    for (var i=0; i < languages.length; i++) {
      languages[i] = languages[i].substring(0, 2);
    }
    return languages
  }

  getVideoTracksLabels(){
    if (!this.hasVideoTracks) return null
    return this.getVideoTracks().map((x) => {
      return x['label'] || null;
    });
  }

  getVideoTracksNumber(){
    if (!this.hasVideoTracks) return null
    return this.videoElement.videoTracks.length;
  }

  getVideoTracksMenu(){
    let tracks = [];
    for (var i=0; i < this.getVideoTracks().length; i++) {
      let track = this.getVideoTracks()[i];
      tracks.push({
        "text": (track.label || ui_translator.getDialogInLanguage('track') + ' ' + String(i + 1)) + ' [' + this.getVideoTracksFullLanguages()[i] + ']',
        "events": {
          "click": function(e){
            viewer.playVideoTrackId(track.id);
          }
        }
      });
    }
    return {
      "text": ui_translator.getDialogInLanguage('video_tracks'),
      "sub": tracks
    }
  }

  addOptionInSelectMenu(element = document.createElement('select'), option){
    let opt = document.createElement('option');
    opt.value = option.value;
    opt.innerText = option.text;
    element.appendChild(opt);
  }

  setSelectMenuOptions(element = document.createElement('select'), options){
    element.innerHTML = '';
    for (var i=0; i < options.length; i++){
      this.addOptionInSelectMenu(element, options[i]);
    }
    return element
  }

  refreshVideoTracksMenu(){
    let tracks = this.getVideoTracks();
    let opts = [];
    for (var i=0; i < tracks.length; i++){
      opts.push({
        text: (tracks[i].label || ui_translator.getDialogInLanguage('track') + ' ' + String(i + 1)) + ' [' + this.getVideoTracksFullLanguages()[i] + ']',
        value: tracks[i].id,
      })
    }
    this.setSelectMenuOptions(document.querySelector('.videotracks .popup .main select'), opts);
    this.selectedVideoTrack(tracks[0].id);
  }

  openVideoTracksMenu(){
    document.querySelector('.videotracks').classList.remove('hidden');
    this.refreshVideoTracksMenu();
  }

  selectedVideoTrack(value){
    document.querySelector('.videotracks .popup .main .buttons span.track').innerText = document.querySelector('.videotracks .popup .main select option[value="' + value + '"]').innerText;
    let track = this.videoElement.videoTracks.getTrackById(value);
    document.querySelector('.videotracks .popup .main .label input').value = track.label;
    document.querySelector('.videotracks .popup .main .id input').value = value;
    document.querySelector('.videotracks .popup .main .language input').value = this.getVideoTracksFullLanguages()[this.getVideoTracksIDs().indexOf(value)];
  }

  playSelectedVideoTrack(){
    this.playVideoTrackId(document.querySelector('.videotracks .popup .main select').value);
  }

  getQueryOfElement(element){
    var elements = [];
    var e = null;
    elements.push(element);
    while (e != document.body){
      elements.push(elements[elements.length - 1].parentElement);
      e = elements[elements.length - 1];
    }
    elements.reverse();
    
    var query = '';
  
    for (var i in elements){
      query += elements[i].localName;
  
      if (elements[i].id != ''){
        query += '#' + elements[i].id;
      }
  
      if (elements[i].className != ''){
        if (elements[i].className.includes(' ')){
          query += '.' + elements[i].className.replaceAll(' ', '.');
        } else {
          query += '.' + elements[i].className
        }
      }
      
      if ((elements.length - 1) != i){
        query += ' ';
      }
    }
  
    return query;
  }
  
  getQueryAllOfElement(element){
    let q = getQueryOfElement(element);
    let qall = [];
  
    for (var i=0; i < document.querySelectorAll(q).length; i++) {
      qall.push(document.querySelectorAll(q)[i])
    }
    
    return {query: q, index: qall.indexOf(element)};
  }

  async importFileInPlaylist(){
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    var input = document.createElement('input');
    input.type = "file";
    input.accept = "video/*, audio/*, image/*";
    input.click();
    await this.getPromiseFromEvent(input, 'change');
    var file = input.files[0];
    this.playlist_.push(file);
  }

  getFileType(file){
    let video_exts = ["3g2", "3gp", "aaf", "asf", "avchd", "avi", "drc", "flv", "m2v", "m3u8", "m4p", "m4v", "mkv", "mng", "mov", "mp2", "mp4", "mpe", "mpeg", "mpg", "mpv", "mxf", "nsv", "ogg", "ogv", "qt", "rm", "rmvb", "roq", "svi", "vob", "webm", "wmv", "yuv"];
    let image_exts = ["ase", "art", "bmp", "blp", "cd5", "cit", "cpt", "cr2", "cut", "dds", "dib", "djvu", "egt", "exif", "gif", "gpl", "grf", "icns", "ico", "iff", "jng", "jpeg", "jpg", "jfif", "jp2", "jps", "lbm", "max", "miff", "mng", "msp", "nef", "nitf", "ota", "pbm", "pc1", "pc2", "pc3", "pcf", "pcx", "pdn", "pgm", "PI1", "PI2", "PI3", "pict", "pct", "pnm", "pns", "ppm", "psb", "psd", "pdd", "psp", "px", "pxm", "pxr", "qfx", "raw", "rle", "sct", "sgi", "rgb", "int", "bw", "tga", "tiff", "tif", "vtf", "xbm", "xcf", "xpm", "3dv", "amf", "ai", "awg", "cgm", "cdr", "cmx", "dxf", "e2d", "egt", "eps", "fs", "gbr", "odg", "svg", "stl", "vrml", "x3d", "sxd", "v2d", "vnd", "wmf", "emf", "art", "xar", "png", "webp", "jxr", "hdp", "wdp", "cur", "ecw", "iff", "lbm", "liff", "nrrd", "pam", "pcx", "pgf", "sgi", "rgb", "rgba", "bw", "int", "inta", "sid", "ras", "sun", "tga", "heic", "heif"];
    let audio_exts = ["wav", "bwf", "raw", "aiff", "flac", "m4a", "pac", "tta", "wv", "ast", "aac", "mp2", "mp3", "mp4", "amr", "s3m", "3gp", "act", "au", "dct", "dss", "gsm", "m4p", "mmf", "mpc", "ogg", "oga", "opus", "ra", "sln", "vox"];
    
    if (typeof file != 'string'){
      file = file.name;
    }

    if (!file.includes('.')){
      return file
    }

    if (video_exts.includes(file.split('.').pop())){
      return 'video';
    } else if (image_exts.includes(file.split('.').pop())){
      return 'image';
    } else if (audio_exts.includes(file.split('.').pop())){
      return 'audio';
    } else {
      return file.split('.').pop()
    }
  }

  async getMediaInfos(url, checkResponse=true){
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    var data = {sucess: true};
    if (this.getFileType(url) == 'video'){
      let video = document.createElement('video');
      video.src = url;

      if (checkResponse){
        while ((video.videoHeight == 0)){
          await delay(0.1);
        }
  
        while ((video.videoWidth == 0)){
          await delay(0.1);
        }
        
        while ((video.duration == NaN)){
          await delay(0.1);
        }
      }

      Object.assign(data, {height: video.videoHeight, width: video.videoWidth, duration: video.duration});
    } else if (this.getFileType(url) == 'image'){
      let image = document.createElement('img');
      image.src = url;
      
      if (checkResponse){
        while ((image.height == 0)){
          await delay(0.1);
        }
  
        while ((image.width == 0)){
          await delay(0.1);
        }
      }

      Object.assign(data, {height: image.height, width: image.width});
    } else if (this.getFileType(url) == 'audio'){
      let audio = document.createElement('audio');
      audio.src = url;
      
      if (checkResponse){
        while ((audio.duration == NaN)){
          await delay(0.1);
        }
      }

      Object.assign(data, {duration: audio.duration});
    } else {
      data.sucess = false;
    }

    return data;
  }

  async getPlayingMediaInfos(mode = this.mode, checkResponse=true){
    const delay = s => new Promise(res => setTimeout(res, s*1000));
    var data = {sucess: true};

    var video, image, audio
    video = this.videoElement;
    image = this.imageElement;
    audio = this.audioElement;

    if (mode == 'video'){
      if (checkResponse){
        while ((video.videoHeight == 0)){
          await delay(0.1);
        }
  
        while ((video.videoWidth == 0)){
          await delay(0.1);
        }
        
        while ((video.duration == NaN)){
          await delay(0.1);
        }
      }

      Object.assign(data, {height: video.videoHeight, width: video.videoWidth, duration: video.duration});
    } else if (mode == 'image'){
      if (checkResponse){
        while ((image.height == 0)){
          await delay(0.1);
        }
  
        while ((image.width == 0)){
          await delay(0.1);
        }
      }

      Object.assign(data, {height: image.height, width: image.width});
    } else if (mode == 'audio'){
      if (checkResponse){
        while ((audio.duration == NaN)){
          await delay(0.1);
        }
      }

      Object.assign(data, {duration: audio.duration});
    } else {
      data.sucess = false;
    }

    return data;
  }

  refreshPlaylist(){
    let files = [];
    for (var i = 0; i < this.playlist_.length; i++){
      files.push([this.playlist_[i].name, this.getMediaLength(this.playlist_[i])]);
    }
  }

  addFileToPlaylist(){}
}

let viewer = new Viewer(true, true);