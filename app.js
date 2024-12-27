
    const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('hidden');
        });

        window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('open');
        }
        });
        
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
        
            // Aktifkan preloader
            preloader.classList.add('active');
        
            // Biarkan preloader tampil selama 2 detik
            setTimeout(() => {
                preloader.classList.remove('active');
                preloader.classList.add('fade-out');
                }, 500); // Waktu fade-out sesuai dengan transition di CSS (0.5 detik)
            }, 1000); // Waktu tampil preloader (2 detik)
        
        //Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
            });
        });
        });

        //close orderForm Section when Explore Services clicked
        document.getElementById('services').addEventListener('click', () => {
        const orderSection = document.getElementById('order');
        orderSection.classList.add('hidden');
        })

        //close and open faq items when icons are clicked and just show titles when closed
        const faqItems = document.querySelectorAll('.bg-gray-700');
        faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const icon = item.querySelector('i');
            icon.classList.toggle('fa-angle-up');
            icon.classList.toggle('fa-angle-down');
            item.querySelector('p').classList.toggle('hidden');
        });
        })

    const translations = {
      id: {
        'home-title': 'Selamat Datang di SeJasa',
        'home-description': 'Menyediakan layanan premium untuk pemain Growtopia',
        'home-cta': 'Jelajahi Layanan',
        'services-title': 'Layanan Kami',
        'trusted-boards-title': 'Trusted Board List',
        'order-now': 'Pesan Sekarang',
        'about-title': 'Tentang Kami',
        'about-description': 'SeJasa adalah penyedia layanan terpercaya untuk pemain Growtopia. Kami menawarkan berbagai layanan berkualitas tinggi untuk membantu Anda dalam permainan.',
        'about-mission': 'Misi kami adalah memberikan pengalaman terbaik bagi pelanggan dengan layanan yang cepat, andal, dan aman.',
        'contact-title': 'Hubungi Kami',
        'order-title': 'Buat Pesanan',
        'world-name': 'Nama World',
        'owner-name': 'GrowID Pemilik',
        'whatsapp-number': 'Nomor WhatsApp',
        'quantity': 'Jumlah',
        'payment-method': 'Metode Pembayaran',
        'select-payment': 'Pilih metode pembayaran',
        'total-price': 'Total Harga',
        'payment-proof': 'Bukti Pembayaran',
        'submit-order': 'Kirim Pesanan'
      },
      en: {
        'home-title': 'Welcome to SeJasa',
        'home-description': 'Providing premium services for Growtopia players',
        'home-cta': 'Explore Services',
        'services-title': 'Our Services',
        'trusted-boards-title': 'Trusted/Testimonial Board',
        'order-now': 'Order Now',
        'about-title': 'About Us',
        'about-description': 'SeJasa is a trusted service provider for Growtopia players. We offer a variety of high-quality services to assist you in the game.',
        'about-mission': 'Our mission is to provide the best experience for customers with fast, reliable, and secure services.',
        'contact-title': 'Contact Us',
        'order-title': 'Place an Order',
        'world-name': 'World Name',
        'owner-name': 'Owner GrowID',
        'whatsapp-number': 'WhatsApp Number',
        'quantity': 'Quantity',
        'payment-method': 'Payment Method',
        'select-payment': 'Select payment method',
        'total-price': 'Total Price',
        'payment-proof': 'Payment Proof',
        'submit-order': 'Submit Order'
      }
    };

    function updateTranslations(language) {
      const elements = document.querySelectorAll('[data-translate]');
      elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
      });
    }

    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', () => {
      const selectedLanguage = languageSelect.value;
      updateTranslations(selectedLanguage);
    });

    const languageSelectMobile = document.getElementById('languageSelectMobile');
    languageSelectMobile.addEventListener('change', () => {
      const selectedLanguage = languageSelectMobile.value;
      updateTranslations(selectedLanguage);
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Trusted Boards
        const trustedBoards = [];
        let trustedCurrentPage = 1;
        const trustedItemsPerPage = 3;
    
        async function fetchTrustedBoards() {
            const response = await fetch('trustboard.json');
            const data = await response.json();
            trustedBoards.push(...data);
            renderTrustedBoards();
            renderTrustedPagination();
        }
    
        function renderTrustedBoards() {
            const start = (trustedCurrentPage - 1) * trustedItemsPerPage;
            const end = trustedCurrentPage * trustedItemsPerPage;
            const currentData = trustedBoards.slice(start, end);
    
            const trustedBoardsContainer = document.getElementById('trustedBoards');
            trustedBoardsContainer.innerHTML = '';
    
            currentData.forEach(item => {
                const card = document.createElement('div');
                card.className = 'trusted-card';
                card.innerHTML = `
                    <div class="trusted-card-header">
                        <span class="font-bold">${item.GrowID}</span>
                        <span class="text-sm">${item.Tanggal}</span>
                    </div>
                    <div class="trusted-card-body">${item.Pesan}</div>
                    <div class="trusted-card-footer">
                        <i class="fas fa-thumbs-up"></i> Trusted
                    </div>
                `;
                trustedBoardsContainer.appendChild(card);
            });
        }
    
        function renderTrustedPagination() {
            const totalPages = Math.ceil(trustedBoards.length / trustedItemsPerPage);
            const paginationContainer = document.getElementById('pagination');
            paginationContainer.innerHTML = '';
    
            const prevButton = document.createElement('button');
            prevButton.className = `pagination-btn ${trustedCurrentPage === 1 ? 'disabled' : ''}`;
            prevButton.innerText = 'Prev';
            prevButton.disabled = trustedCurrentPage === 1;
            prevButton.addEventListener('click', () => changeTrustedPage(trustedCurrentPage - 1));
            paginationContainer.appendChild(prevButton);
    
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.className = `pagination-btn ${trustedCurrentPage === i ? 'disabled' : ''}`;
                pageButton.innerText = i;
                pageButton.addEventListener('click', () => changeTrustedPage(i));
                paginationContainer.appendChild(pageButton);
            }
    
            const nextButton = document.createElement('button');
            nextButton.className = `pagination-btn ${trustedCurrentPage === totalPages ? 'disabled' : ''}`;
            nextButton.innerText = 'Next';
            nextButton.disabled = trustedCurrentPage === totalPages;
            nextButton.addEventListener('click', () => changeTrustedPage(trustedCurrentPage + 1));
            paginationContainer.appendChild(nextButton);
        }
    
        function changeTrustedPage(page) {
            trustedCurrentPage = page;
            renderTrustedBoards();
            renderTrustedPagination();
        }
    
        fetchTrustedBoards();
    
        // Services
        const services = [];
        let servicesCurrentPage = 1;
        const servicesItemsPerPage = 6;
        let filteredServices = [];
    
        fetch('services.json')
            .then(response => response.json())
            .then(data => {
                services.push(...data);
                filteredServices = [...services];
                renderServices();
                renderServicePagination();
            });
    
        function renderServices() {
            const serviceList = document.getElementById('serviceList');
            const start = (servicesCurrentPage - 1) * servicesItemsPerPage;
            const end = servicesCurrentPage * servicesItemsPerPage;
            const currentServices = filteredServices.slice(start, end);
    
            serviceList.innerHTML = '';
    
            currentServices.forEach(service => {
                const serviceCard = `
                    <div class="bg-gray-700 p-6 rounded-md shadow service-card">
                        <h3 class="text-xl font-bold">${service.name}</h3>
                        <p class="text-gray-400 mb-4">${service.description}</p>
                        <p class="text-green-400 font-bold text-lg">${service.price} WL</p>
                        <a href="#order" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 inline-block" data-translate="order-now" onclick="showOrderForm('${service.name}')">
                            Pesan Sekarang
                        </a>
                    </div>
                `;
                serviceList.innerHTML += serviceCard;
            });
        }
    
        function renderServicePagination() {
            const totalPages = Math.ceil(filteredServices.length / servicesItemsPerPage);
            const paginationContainer = document.getElementById('servicePagination');
            paginationContainer.innerHTML = '';
    
            const prevButton = document.createElement('button');
            prevButton.className = `pagination-btn ${servicesCurrentPage === 1 ? 'disabled' : ''}`;
            prevButton.innerText = 'Prev';
            prevButton.disabled = servicesCurrentPage === 1;
            prevButton.addEventListener('click', () => changeServicePage(servicesCurrentPage - 1));
            paginationContainer.appendChild(prevButton);
    
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.className = `pagination-btn ${servicesCurrentPage === i ? 'disabled' : ''}`;
                pageButton.innerText = i;
                pageButton.addEventListener('click', () => changeServicePage(i));
                paginationContainer.appendChild(pageButton);
            }
    
            const nextButton = document.createElement('button');
            nextButton.className = `pagination-btn ${servicesCurrentPage === totalPages ? 'disabled' : ''}`;
            nextButton.innerText = 'Next';
            nextButton.disabled = servicesCurrentPage === totalPages;
            nextButton.addEventListener('click', () => changeServicePage(servicesCurrentPage + 1));
            paginationContainer.appendChild(nextButton);
        }
    
        function changeServicePage(page) {
            servicesCurrentPage = page;
            renderServices();
            renderServicePagination();
        }
    
        document.getElementById('serviceSearch').addEventListener('input', () => {
            const searchInput = document.getElementById('serviceSearch').value.toLowerCase();
            filteredServices = services.filter(service =>
                service.name.toLowerCase().includes(searchInput) ||
                service.description.toLowerCase().includes(searchInput)
            );
            servicesCurrentPage = 1;
            renderServices();
            renderServicePagination();
        });
    });    

      function showOrderForm(serviceName) {
        const serviceSection = document.getElementById('services');
        const orderSection = document.getElementById('order');
        const orderForm = document.getElementById('orderForm');
        const preloader = document.querySelector('.preloader');
    
        preloader.classList.add('active');
    
        serviceSection.classList.add('fade-out');
    
        setTimeout(() => {
            serviceSection.classList.add('hidden');
            orderSection.classList.remove('hidden');
    
            orderForm.innerHTML = `
            <div class="bg-gray-700 p-6 rounded shadow">
                <h3 class="text-xl font-bold mb-4">Order ${serviceName}</h3>
                <form id="orderFormData">
                    <div class="mb-4">
                        <label for="worldName" class="block text-gray-400 font-bold mb-2">Nama World</label>
                        <input type="text" id="worldName" name="worldName" class="w-full bg-gray-600 text-white rounded py-2 px-3" required>
                    </div>
                    <div class="mb-4">
                        <label for="ownerName" class="block text-gray-400 font-bold mb-2">GrowID Pemilik</label>
                        <input type="text" id="ownerName" name="ownerName" class="w-full bg-gray-600 text-white rounded py-2 px-3" required>
                    </div>
                    <div class="mb-4">
                        <label for="whatsappNumber" class="block text-gray-400 font-bold mb-2">Nomor WhatsApp</label>
                        <input type="text" id="whatsappNumber" name="whatsappNumber" class="w-full bg-gray-600 text-white rounded py-2 px-3" required>
                    </div>
                    <div class="mb-4">
                        <label for="quantity" class="block text-gray-400 font-bold mb-2">Jumlah</label>
                        <input type="number" id="quantity" name="quantity" class="w-full bg-gray-600 text-white rounded py-2 px-3" min="1" required>
                        <p class="text-gray-500 text-sm mt-1" id="quantityDescription"></p>
                    </div>
                    <div class="mb-4">
                        <label for="paymentMethod" class="block text-gray-400 font-bold mb-2">Metode Pembayaran</label>
                        <select id="paymentMethod" name="paymentMethod" class="w-full bg-gray-600 text-white rounded py-2 px-3" required>
                            <option value="" disabled selected>Pilih metode pembayaran</option>
                            <option value="Growtopia">Growtopia</option>
                            <option value="GoPay">GoPay</option>
                            <option value="OVO">OVO</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="totalPrice" class="block text-gray-400 font-bold mb-2">Total Harga</label>
                        <input type="text" id="totalPrice" name="totalPrice" class="w-full bg-gray-600 text-white rounded py-2 px-3" readonly>
                        <p class="text-gray-500 text-sm mt-1" id="totalPriceIDR"></p>
                    </div>
                    <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        Kirim Pesanan
                    </button>
                </form>
            </div>
            `;
    
            updateTranslations(languageSelect.value);
    
            const quantityDescription = document.getElementById('quantityDescription');
            const quantity = document.getElementById('quantity');
            const totalPrice = document.getElementById('totalPrice');
            const totalPriceIDR = document.getElementById('totalPriceIDR');
            const price = getServicePrice(serviceName);
    
            // Set deskripsi berdasarkan layanan
            switch (serviceName) {
                case 'Jasa Harvest':
                case 'Jasa Plant':
                case 'Jasa Ghost':
                case 'Jasa Clear':
                case 'Jasa Collect & Put':
                case 'Jasa Splice':
                    quantityDescription.textContent = 'per World';
                    break;
                case 'Jasa Break':
                case 'Jasa Move':
                    quantityDescription.textContent = 'per 2,500 Block or Seed';
                    break;
                case 'Jasa GAUT':
                case 'Jasa GAIA':
                case 'Jasa UT':
                    quantityDescription.textContent = 'per Hour/Jam';
                    break;
                case 'Jasa Midman':
                    quantityDescription.textContent = 'per Transaction/Transaksi';
                    break;
                case 'Beli Diamond Lock':
                case 'Beli World Lock':
                case 'Beli BGL':
                    quantityDescription.textContent = 'per Lock';
            }
    
            // Hitung total harga
            quantity.addEventListener('input', () => {
                const totalPriceWL = price * quantity.value;
                totalPrice.value = `${totalPriceWL} WL`;
                totalPriceIDR.textContent = `Rp ${(
                    totalPriceWL * 200
                ).toLocaleString('id-ID')}`;
            });
    
            // Tangani pengiriman form
            document.getElementById('orderFormData').addEventListener('submit', (e) => {
                e.preventDefault();
    
                const worldName = document.getElementById('worldName').value.trim();
                const ownerName = document.getElementById('ownerName').value.trim();
                const whatsappNumber = document.getElementById('whatsappNumber').value.trim();
                const quantityValue = quantity.value.trim();
                const paymentMethod = document.getElementById('paymentMethod').value.trim();
                const totalPriceValue = totalPrice.value.trim();
    
                if (!worldName || !ownerName || !whatsappNumber || !quantityValue || !paymentMethod) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Harap isi semua field dengan benar!',
                        background: '#1F2937',
                        color: '#F3F4F6',
                        confirmButtonColor: '#68D391',
                    });
                    return;
                }

                let paymentInstruction = '';
                  if (paymentMethod === 'Growtopia') {
                      paymentInstruction = `<p>Silahkan melakukan Pembayaran ke World <b>W2SKZ0</b></p>`;
                  } else if (paymentMethod === 'GoPay' || paymentMethod === 'OVO') {
                      paymentInstruction = `<p>Silahkan melakukan pembayaran ke nomor <b>+628111035042</b></p>`;
                  }
                  
                // Konfirmasi pesanan
                Swal.fire({
                    title: 'Konfirmasi Pesanan',
                    html: `
                        <p>Layanan: <b>${serviceName}</b></p>
                        <p>Nama World: <b>${worldName}</b></p>
                        <p>Nama Pemilik: <b>${ownerName}</b></p>
                        <p>Jumlah: <b>${quantityValue}</b></p>
                        <p>Metode Pembayaran: <b>${paymentMethod}</b></p>
                        <p>Total Harga: <b>${totalPriceValue} / ${totalPriceIDR.textContent}</b></p>
                        ${paymentInstruction}
                    `,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Kirim Pesanan',
                    cancelButtonText: 'Batal',
                    background: '#1F2937',
                    color: '#F3F4F6',
                    confirmButtonColor: '#68D391',
                    cancelButtonColor: '#E53E3E',
                }).then((result) => {
                    if (result.isConfirmed) {
                        const message = `Halo, Saya ingin memesan layanan ${serviceName}:\n\n` +
                            `- Nama World: ${worldName}\n` +
                            `- GrowID: ${ownerName}\n` +
                            `- Nomor WhatsApp: ${whatsappNumber}\n` +
                            `- Jumlah: ${quantityValue}\n` +
                            `- Metode Pembayaran: ${paymentMethod}\n` +
                            `- Total Harga: ${totalPriceValue}\n\n` +
                            `Instruksi Pembayaran:\n${paymentInstruction.replace(/<[^>]+>/g, '')}\n\n` +
                            `Terima kasih!`;
    
                        const whatsappURL = `https://wa.me/62811103542?text=${encodeURIComponent(message)}`;
                        window.open(whatsappURL, '_blank');
                    }
                });
            });
    
            preloader.classList.remove('active');
        }, 500);
    }
    
    // Fungsi untuk mendapatkan harga layanan
    function getServicePrice(serviceName) {
        switch (serviceName) {
            case 'Jasa Harvest':
            case 'Jasa Plant':
            case 'Jasa UT':
            case 'Jasa Ghost':
            case 'Jasa Splice':
                return 4;
            case 'Jasa GAUT':
                return 10;
            case 'Jasa Midman':
            case 'Jasa GrowScan':
                return 15;
            case 'Jasa GAIA':
            case 'Jasa UT':
                return 6;
            case 'Jasa Collect & Put':
            case 'Jasa Move':
                return 3;
            case 'Jasa Break':
                return 10;
            case 'Jasa Clear':
                return 15;
            case 'Beli Diamond Lock':
                return 2550;
        }
    }    
