const prices = {
    'bronze': {
        pm: 700,
        design: 600,
        languages: 1200,
        modeling: 500
    },
    'silver': {
        pm: 1200,
        design: 900,
        languages: 2500,
        modeling: 800,
    },
    'golden': {
        pm: 2000,
        design:1100,
        languages:3000,
        modeling: 1000,
    },
    'brilliant': {
        pm: 3000,
        design: 1500,
        languages: 4000,
        modeling: 1300,
    }
};

function getFormValues () {
    const websiteTypeElement = document.querySelector ('#project-type');

    const pmEl = document.querySelector('#project-management'); 
    const designEl = document.querySelector('#design'); 
    const languagesEl = document.querySelector('#languages');
    const modelingEl = document.querySelector('#modeling');

    return {
        websiteType: websiteTypeElement.value,
        pm: pmEl.checked,
        design: designEl.checked,
        languages: languagesEl.checked,
        modeling: modelingEl.checked,
    }
}

function calculateWork () {
    const values = getFormValues ();
    
    let totalPrice = 0;
    const workTypes = prices [values.websiteType];

    if (values.pm) {
        totalPrice = workTypes.pm;
    }

    if (values.design) {
        totalPrice =  totalPrice + workTypes.design;
    }

    if (values.languages) {
        totalPrice =  totalPrice + workTypes.languages;
    }

    if (values.modeling) {
        totalPrice =  totalPrice + workTypes.modeling;
    }

    const totalPriceEl = document.querySelector('#total-price');
    totalPriceEl.textContent = totalPrice;
    console.log (totalPrice);
}

getFormValues();

const formEl = document.querySelector('#project-price-form');
const emailModal = document.querySelector('#modal-email');
const successModal = document.querySelector('#success-modal');

calculateWork();

formEl.addEventListener('change', calculateWork);

formEl.addEventListener('submit', function(event) {
    event.preventDefault();

    emailModal.classList.add('modal-active')

});

const closeButtons = document.querySelectorAll('.modal-close-button');
closeButtons.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function () {
        const inputContainer = document.querySelector('#email-input-container');
        inputContainer.classList.remove('email-input-container-error');

        emailModal.classList.remove('modal-active');
        successModal.classList.remove('modal-active');
    });
});

const modalEmailContainer = document.querySelector('#modal-email-container');

modalEmailContainer.addEventListener('submit', function(event) {
    event.preventDefault();

    const userEmailInput = document.querySelector('#user-email');

    if (userEmailInput.value) {
        const formData = new FormData(formEl);
        formData.append('email', userEmailInput.value);

        fetch('/', {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        })
        .then(function() {
            emailModal.classList.remove('modal-active');
            successModal.classList.add('modal-active');
        })
        .catch(() => alert('Не удалось отправить форму'))
        return;
    }

    const inputContainer = document.querySelector('#email-input-container');
    inputContainer.classList.add('email-input-container-error');
});
