import { NextResponse } from 'next/server';
import { regex } from '@/global/constants';
import { removeHtmlTags } from '@/utils/functions';

const isValidEmail = (email) => {
  return regex.email.test(email.toLowerCase());
}
const isValidPhone = (phone) => {
  return regex.phone.test(phone);
}

const constructMessage = (data) => {
  const {
    services = '',
    budget = '',
    deadline = '',
    name = '',
    email = '',
    phone = '',
    company = '',
    message = '',
    legal = '',
    title = '',
    website = '',
  } = data;

  function formatServicesObject(jsonObj) {
    const keys = Object.keys(jsonObj);
    const formattedArray = [];
    for (const key of keys) {
      const value = jsonObj[key];
      if (value) {
        let formattedValue = value;
        if (Array.isArray(value)) {
          formattedValue = value.join(', ');
        }
        formattedArray.push(`<b>${key}:</b> ${formattedValue}`);
      }
    }
    if (formattedArray.length > 0) {
      return formattedArray.join(' ');
    } else {
      return '<b>Not specified</b>';
    }
  }

  return `
<p>Title: <b>${title || 'Not specified'}</b></p>
<p>Name: <b>${name}</b></p>
<p>Email: <b>${email}</b></p>
<p>Phone: <b>${phone || 'Not specified'}</b></p>
<p>Company: <b>${company || 'Not specified'}</b></p>
<p>Website: <b>${website || 'Not specified'}</b></p>
<p>Budget: <b>${budget !== null ? budget : 'Not specified'}</b></p>
<p>Deadline: <b>${deadline !== null ? deadline : 'Not specified'}</b></p>
<p>Services: ${formatServicesObject(services)}</p>

${message && `<p>${message}</p>`}

<br /><br />
<p>${legal && 'Privacy policy accepted'}</p>`;
}

export async function POST(request) {
  const req = await request.json();
  const { name = '', email = '', phone = '', legal = false } = req;

  if ((name.trim().length === 0
    ||
    !isValidEmail(email)
    ||
    (phone && !isValidPhone(phone))
    ||
    !legal)) {
    return NextResponse.json({ success: false }, { status: 422 })
  }

  // const messageBody = constructMessage(req);

  try {
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
