/**
 * ========================================================================
 * Lógica do Cérebro da Aplicação
 * Funcionalidade: Coleta de dados da propriedade e formatação para o Backend
 * ========================================================================
 */

// Init
document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos do DOM
    const form = document.getElementById('propertyForm');
    
    const addCultureBtn = document.getElementById('addCultureBtn');

    // Handler pra adicionar cultura customizada (Outros)
    addCultureBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evita trigger do checkbox default 
        
        const novaCultura = prompt("Qual outra cultura você planta?");
        
        if (novaCultura && novaCultura.trim() !== "") {
            const grid = document.getElementById('cropsGrid');
            const newLabel = document.createElement('label');
            newLabel.className = 'selection-card checkbox-card';
            
            // Format (Capitalize e Slug)
            const nomeFormatado = novaCultura.charAt(0).toUpperCase() + novaCultura.slice(1);
            const valorInput = novaCultura.toLowerCase().replace(/\s+/g, '-');

            // Renderiza o novo card com o checkbox já marcado
            newLabel.innerHTML = `
                <input type="checkbox" name="culturas" value="${valorInput}" checked>
                <div class="card-content">
                    <span class="emoji">🌿</span>
                    <h3>${nomeFormatado}</h3>
                </div>
            `;
            
            // Append antes do botão de add
            grid.insertBefore(newLabel, addCultureBtn);
        }
    });

    // Submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Payload e Validações
        
        const municipio = document.getElementById('municipio').value;
        const comunidade = document.getElementById('comunidade').value;

        const soloSelecionado = document.querySelector('input[name="solo"]:checked');
        
        if (!soloSelecionado) {
            alert("Por favor, selecione um tipo de solo.");
            return;
        }

        // Coleta Array de culturas marcadas
        const culturasSelecionadas = document.querySelectorAll('input[name="culturas"]:checked');
        const arrayCulturas = Array.from(culturasSelecionadas).map(input => input.value);

        if (arrayCulturas.length === 0) {
            alert("Por favor, selecione pelo menos uma cultura principal.");
            return;
        }

        // Payload final pra API
        const perfilPropriedade = {
            localizacao: {
                municipio: municipio,
                comunidade: comunidade
            },
            tipoDeSolo: soloSelecionado.value,
            culturas: arrayCulturas,
            dataRegistro: new Date().toISOString()
        };

        console.log("=== PAYLOAD (CÉREBRO) ===");
        console.log(JSON.stringify(perfilPropriedade, null, 2));
        
        // UI Feedback
        const btnSubmit = document.querySelector('.btn-submit');
        const conteudoOriginalBtn = btnSubmit.innerHTML;
        
        btnSubmit.innerHTML = `<span>Salvo com Sucesso!</span> <i data-lucide="check-circle"></i>`;
        btnSubmit.style.background = "#1b5e20"; // Um verde mais escuro
        lucide.createIcons(); // Recarrega o ícone do check

        // Mock response
        alert(`O Cérebro agradece! \nPropriedade salva em: ${municipio}.\nSolo: ${soloSelecionado.value}\nCulturas: ${arrayCulturas.join(', ')}`);

        // Reset state
        setTimeout(() => {
            btnSubmit.innerHTML = conteudoOriginalBtn;
            btnSubmit.style.background = "";
            lucide.createIcons();
            // form.reset(); 
        }, 3000);
    });
});
