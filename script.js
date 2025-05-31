// Configuration des membres
const orgData = {
    level3: [
        {name: "Nassour yakhoub", role: "R.DESIGN", photo: "ns.jpg"},
        {name: "Kaddi Imane", role: "R.Trésorerie", photo: "moussa.jpg"},
        {name: "Bensiali Zineb", role: "R.Communication & Sponsoring", photo: "zeyneb.png"},
        {name: "Taroui Salma", role: "R.Photographie", photo: "moussa.jpg"},
        {name: "Adam Mahamat", role: "R.Logoistique & Materiel", photo: "adam.png"},
        {name: "Fadoua Debagh", role: "R.Protocole & Reception", photo: "fadoua.png"},
        {name: "Hamit Bokhit", role: "R.Lecture & Rédaction", photo: "hamit.png"},
        {name: "Lionel Jolidon", role: "R.Relations internationales", photo: "jolidon.png"},
        {name: "Smat Samia", role: "R.Organisation & Event", photo: "smat.png"},
        {name: "Badi Munga", role: "R.Art & Culture", photo: "moussa.jpg"}
    ],
    level4: [
        {name: "Idriss Ahmat", role: "R.A.Protocole & Reception", photo: "idriss.jpg"},
        {name: "Ghizlan Bary", role: "R.A.Logoistique & Materiel", photo: "moussa.jpg"},
        {name: "Nouhaila Ouaragui", role: "R.A.Trésorerie", photo: "moussa.jpg"},
        {name: "Fatima Lambitel", role: "R.A.Lecture & Rédaction", photo: "moussa.jpg"},
        {name: "Hiba Belyouni", role: "R.A.Organisation & Event", photo: "moussa.jpg"}
    ]
};

class OrganigrammeManager {
    constructor() {
        this.mouseDown = false;
        this.startX = 0;
        this.scrollLeft = 0;
    }

    createMemberCard(member) {
        return `
            <div class="member">
                <div class="photo-wrapper">
                    <img src="assets/photos/${member.photo}" alt="${member.name}" class="photo" loading="lazy">
                </div>
                <div class="info">
                    <h2>${member.name}</h2>
                    <p>${member.role}</p>
                </div>
            </div>
        `;
    }

    setupDragScroll(container) {
        const row = container.querySelector('.members-row');
        
        // Gestion du drag
        container.addEventListener('mousedown', (e) => {
            this.mouseDown = true;
            this.startX = e.pageX - container.offsetLeft;
            this.scrollLeft = row.scrollLeft;
            container.style.cursor = 'grabbing';
            row.style.animationPlayState = 'paused';
        });

        container.addEventListener('mouseleave', () => {
            this.mouseDown = false;
            container.style.cursor = 'grab';
            row.style.animationPlayState = 'running';
        });

        container.addEventListener('mouseup', () => {
            this.mouseDown = false;
            container.style.cursor = 'grab';
            row.style.animationPlayState = 'running';
        });

        container.addEventListener('mousemove', (e) => {
            if (!this.mouseDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - this.startX) * 2;
            row.scrollLeft = this.scrollLeft - walk;
        });

        // Activation du défilement avec la molette
        container.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                row.scrollLeft += e.deltaY;
                row.style.animationPlayState = 'paused';
                
                // Réactiver l'animation après un délai
                setTimeout(() => {
                    row.style.animationPlayState = 'running';
                }, 2000);
            }
        }, { passive: false });
    }

    renderSection(selector, data) {
        const container = document.querySelector(selector);
        if (!container) return;

        // Double le contenu pour l'effet de boucle sans fin
        const content = data.map(member => this.createMemberCard(member)).join('');
        container.innerHTML = content + content;
        
        // Setup drag scroll
        const scrollContainer = container.parentElement;
        this.setupDragScroll(scrollContainer);
    }

    initialize() {
        this.renderSection('#responsables-list', orgData.level3);
        this.renderSection('#adjoints-list', orgData.level4);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const manager = new OrganigrammeManager();
    manager.initialize();
});