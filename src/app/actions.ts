'use server';

interface ActionState {
  success: boolean;
  message?: string;
  errors?: {
    [key: string]: string;
  };
}

export async function sendTelegramMessage(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram credentials are missing');
    return {
      success: false,
      message: 'Server configuration error. Please try again later.',
    };
  }

  const name = formData.get('name') as string;
  const contact = formData.get('contact') as string;
  const projectDetails = formData.get('projectDetails') as string;

  // Validation
  const errors: { [key: string]: string } = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа';
  }

  if (!contact) {
    errors.contact = 'Поле обязательно для заполнения';
  } else {
    // Check for Telegram username (@username), t.me link, or phone number
    const isTelegramUsername = /^@\w{5,}$/.test(contact.trim());
    const isTelegramLink = /t\.me\//.test(contact.trim());
    const isPhoneNumber = /^\+?[0-9\s\-\(\)]{10,}$/.test(contact.trim());

    if (!isTelegramUsername && !isTelegramLink && !isPhoneNumber) {
      errors.contact = 'Введите корректный Telegram (@username), ссылку t.me или номер телефона';
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const messageText = `
🚀 <b>Новая заявка с сайта Reels Production!</b>
👤 <b>Имя:</b> ${escapeHtml(name)}
📱 <b>Контакты:</b> ${escapeHtml(contact)}
💬 <b>Проект:</b> ${escapeHtml(projectDetails || 'Не указано')}
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API Error:', data);
      return {
        success: false,
        message: 'Ошибка отправки сообщения. Попробуйте позже.',
      };
    }

    return {
      success: true,
      message: 'Заявка успешно отправлена!',
    };
  } catch (error) {
    console.error('Network Error:', error);
    return {
      success: false,
      message: 'Ошибка сети. Проверьте подключение к интернету.',
    };
  }
}
