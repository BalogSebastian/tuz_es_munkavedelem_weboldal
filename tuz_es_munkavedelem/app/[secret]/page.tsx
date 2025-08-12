// app/[secret]/page.tsx
import { notFound } from 'next/navigation';
import { MongoClient } from 'mongodb';
import Link from 'next/link';
import {
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PaperClipIcon // Új ikon az ajánlatkérésekhez
} from '@heroicons/react/24/solid';

export const dynamic = 'force-dynamic';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Kérlek add meg a MONGODB_URI környezeti változót a .env.local fájlban');
}

const client = new MongoClient(uri);

// Adatlekérdezés kiegészítve az `ajanlatkeres` kollekcióval
const getSecretData = async (filter: { from?: string; to?: string }) => {
  try {
    await client.connect();
    const database = client.db('TuzEsMunkaVedelmiLeadek');
    
    const downloadsCollection = database.collection('Letoltesek');
    const consultationCollection = database.collection('erroljoha tudsz');
    const offerRequestCollection = database.collection('ajanlatkeres'); // Új

    // A dátumszűréshez a megfelelő mezőneveket használjuk
    const dateQuery = (fieldName: string) => (filter.from && filter.to
      ? { [fieldName]: { $gte: new Date(filter.from), $lte: new Date(filter.to) } }
      : {});

    const downloads = await downloadsCollection.find(dateQuery('downloadedAt')).sort({ downloadedAt: -1 }).toArray();
    const consultations = await consultationCollection.find(dateQuery('submittedAt')).sort({ submittedAt: -1 }).toArray();
    const offerRequests = await offerRequestCollection.find(dateQuery('submittedAt')).sort({ submittedAt: -1 }).toArray(); // Új

    return {
      downloads: JSON.parse(JSON.stringify(downloads)),
      consultations: JSON.parse(JSON.stringify(consultations)),
      offerRequests: JSON.parse(JSON.stringify(offerRequests)), // Új
    };
  } finally {
    await client.close();
  }
};

// Külön oldalszámok minden kategóriához
interface SearchParams {
  dpage?: string; // downloads page
  cpage?: string; // consultations page
  opage?: string; // offers page
  from?: string;
  to?: string;
}

// Updated function signature to handle async params and searchParams
export default async function SecretPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ secret: string }>; 
  searchParams: Promise<SearchParams> 
}) {
  // Await the params and searchParams
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const secretKey = 'secretdocs134';

  if (resolvedParams.secret !== secretKey) {
    notFound();
  }

  const { from, to, dpage = '1', cpage = '1', opage = '1' } = resolvedSearchParams;
  const itemsPerPage = 10;

  const currentDownloadPage = parseInt(dpage, 10);
  const currentConsultationPage = parseInt(cpage, 10);
  const currentOfferPage = parseInt(opage, 10);

  const { downloads, consultations, offerRequests } = await getSecretData({ from, to });

  const paginatedDownloads = downloads.slice((currentDownloadPage - 1) * itemsPerPage, currentDownloadPage * itemsPerPage);
  const paginatedConsultations = consultations.slice((currentConsultationPage - 1) * itemsPerPage, currentConsultationPage * itemsPerPage);
  const paginatedOfferRequests = offerRequests.slice((currentOfferPage - 1) * itemsPerPage, currentOfferPage * itemsPerPage);

  const totalDownloadPages = Math.ceil(downloads.length / itemsPerPage);
  const totalConsultationPages = Math.ceil(consultations.length / itemsPerPage);
  const totalOfferPages = Math.ceil(offerRequests.length / itemsPerPage);

  // A lapozó most már kezeli a külön oldalszámokat
  const renderPagination = (totalPages: number, currentPage: number, pageParamName: 'dpage' | 'cpage' | 'opage') => {
    const otherParams = new URLSearchParams({
        from: from || '',
        to: to || '',
        dpage: dpage,
        cpage: cpage,
        opage: opage,
    });

    const createPageLink = (page: number) => {
        otherParams.set(pageParamName, page.toString());
        return `?${otherParams.toString()}`;
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
          {currentPage > 1 && (
            <Link href={createPageLink(currentPage - 1)} className="p-2 rounded-full text-white bg-slate-700 hover:bg-slate-600 transition">
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={createPageLink(p)}
              className={`px-4 py-2 rounded-full font-bold transition ${
                p === currentPage
                  ? 'bg-cyan-400 text-slate-900'
                  : 'text-white bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {p}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link href={createPageLink(currentPage + 1)} className="p-2 rounded-full text-white bg-slate-700 hover:bg-slate-600 transition">
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
          )}
        </div>
    );
  };

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');
        .bg-pattern { background-color: #0f172a; background-image: radial-gradient(rgba(3, 186, 190, 0.2) 1px, transparent 1px); background-size: 30px 30px; }
        .text-gradient { background: linear-gradient(to right, #03BABE, #5eead4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #03BABE; border-radius: 10px; border: 2px solid #1e293b; }
        `}
      </style>
      <div className="font-['Poppins',_sans-serif] bg-pattern text-gray-300 min-h-screen p-4 sm:p-8">
        <header className="relative text-center mb-12 sm:mb-16 pb-8 border-b border-gray-700">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 text-white">Adminisztrátori Felület</h1>
            <p className="text-lg text-gray-400">Beérkezett leadek és kérések kezelése</p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-cyan-400 rounded-full"></div>
            <div className="mt-4">
              <Link href="/" className="inline-block px-6 py-2 bg-slate-700 text-white font-bold rounded-md hover:bg-slate-600 transition shadow-md">Vissza a kezdőoldalra</Link>
            </div>
        </header>

        <div className="max-w-7xl mx-auto mb-8 bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-gradient">Szűrés dátum szerint</h2>
          <form className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full"><label htmlFor="from" className="block text-sm font-medium text-gray-400">Kezdő dátum</label><input type="date" id="from" name="from" defaultValue={from} className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400"/></div>
            <div className="flex-1 w-full"><label htmlFor="to" className="block text-sm font-medium text-gray-400">Vég dátum</label><input type="date" id="to" name="to" defaultValue={to} className="mt-1 block w-full rounded-md bg-slate-900 border-slate-700 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400"/></div>
            <button type="submit" className="mt-auto px-6 py-2 bg-cyan-500 text-slate-900 font-bold rounded-md hover:bg-cyan-400 transition shadow-md w-full sm:w-auto">Szűrés</button>
          </form>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ÚJ: Ajánlatkérések szekció */}
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 flex flex-col">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gradient"><PaperClipIcon className="h-6 w-6" />Ajánlatkérések ({offerRequests.length})</h2>
              {paginatedOfferRequests.length === 0 ? (<p className="text-gray-400">Nincsenek ajánlatkérési adatok.</p>) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar flex-grow">
                  {paginatedOfferRequests.map((item: any) => (
                    <div key={item._id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 shadow-md">
                      <p className="text-sm font-semibold text-white">{item.name} - <span className="text-gray-400">{item.email}</span></p>
                      {item.phone && <p className="text-sm text-gray-500">Telefon: <span className="font-medium text-cyan-400">{item.phone}</span></p>}
                      <div className="mt-2 pt-2 border-t border-slate-700 text-xs text-gray-500 space-y-1">
                          <p>Érdeklődés: <b className="font-medium text-cyan-400">{item.services.join(', ')}</b></p>
                          <div className="grid grid-cols-2 gap-1">
                            <span>Munkavállalók: <b className="text-cyan-400">{item.employeeCount}</b></span>
                            <span>Tevékenység: <b className="text-cyan-400">{item.activity}</b></span>
                            <span>Telephelyek: <b className="text-cyan-400">{item.premiseCount}</b></span>
                            <span>Méret: <b className="text-cyan-400">{item.premiseSize}</b></span>
                            <span className="col-span-2">Lokáció: <b className="text-cyan-400">{item.premiseLocation}</b></span>
                          </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Dátum: {new Date(item.submittedAt).toLocaleString('hu-HU')}</p>
                    </div>
                  ))}
                </div>
              )}
              {totalOfferPages > 1 && renderPagination(totalOfferPages, currentOfferPage, 'opage')}
            </div>

            {/* Letöltések szekció */}
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 flex flex-col">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gradient"><DocumentArrowDownIcon className="h-6 w-6" />Letöltések ({downloads.length})</h2>
              {paginatedDownloads.length === 0 ? (<p className="text-gray-400">Nincsenek letöltési adatok.</p>) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar flex-grow">
                  {paginatedDownloads.map((item: any) => (
                    <div key={item._id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 shadow-md">
                      <p className="text-sm font-semibold text-white">{item.name} - <span className="text-gray-400">{item.email}</span></p>
                      {item.phone && <p className="text-sm text-gray-500">Telefon: <span className="font-medium text-cyan-400">{item.phone}</span></p>}
                      <p className="text-xs text-gray-500 mt-1">Dokumentum: <span className="font-medium text-cyan-400">{item.documentTitle}</span></p>
                      <p className="text-xs text-gray-500">Dátum: {new Date(item.downloadedAt).toLocaleString('hu-HU')}</p>
                    </div>
                  ))}
                </div>
              )}
              {totalDownloadPages > 1 && renderPagination(totalDownloadPages, currentDownloadPage, 'dpage')}
            </div>

            {/* Konzultációs kérések szekció */}
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 flex flex-col">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gradient"><CheckCircleIcon className="h-6 w-6" />Konzultációs kérések ({consultations.length})</h2>
              {paginatedConsultations.length === 0 ? (<p className="text-gray-400">Nincsenek konzultációs kérések.</p>) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar flex-grow">
                  {paginatedConsultations.map((item: any) => (
                    <div key={item._id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 shadow-md">
                      <p className="text-sm font-semibold text-white">{item.name} - <span className="text-gray-400">{item.email}</span></p>
                      {item.phone && <p className="text-sm text-gray-500">Telefon: <span className="font-medium text-cyan-400">{item.phone}</span></p>}
                      <p className="text-xs text-gray-500 mt-1">Érdeklődés: <span className="font-medium text-cyan-400">{Array.isArray(item.services) ? item.services.join(', ') : item.services}</span></p>
                      <p className="text-xs text-gray-500">Dátum: {new Date(item.submittedAt).toLocaleString('hu-HU')}</p>
                    </div>
                  ))}
                </div>
              )}
              {totalConsultationPages > 1 && renderPagination(totalConsultationPages, currentConsultationPage, 'cpage')}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}