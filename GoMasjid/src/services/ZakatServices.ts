// In services/ZakatServices.ts or services/ApiServices.ts

export const submitZakatCalculation = async (data: any): Promise<any> => {
    try {
      const response = await fetch('https://admin.gomasjid.co.uk/zakaat-calculation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting zakat calculation:', error);
      throw error;
    }
  };
