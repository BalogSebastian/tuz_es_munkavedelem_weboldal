  <div className="w-full z-40 flex flex-col"> 
                    <div className="bg-red-800 py-4 px-4 sm:px-6 lg:px-8 shadow-md">
                        <div className="max-w-full mx-auto flex items-center justify-center text-center">
                            <motion.div
                                className="flex items-center space-x-3"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: 'easeOut', delay: 1 }}
                            >
                                <ExclamationTriangleIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white animate-pulse" />
                                <p className="text-white font-bold text-lg sm:text-xl md:text-2xl animate-pulse">
                                    Hamarosan elkészül a felületünk. Addig is türelmüket köszönjük!
                                    <br className="sm:hidden" />
                                    <span className="block mt-1 sm:inline sm:ml-2">Státusz változik: Július 13. 23:59-kor</span>
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div> 


                <div className="flex flex-col items-center">
                            <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mb-4"/>
                            <h3 className="text-2xl font-bold text-red-400 mb-2">Rendszerinformáció</h3>
                            <p className="text-slate-300 mb-4">
                                A háttérben a rendszer stabilizálása és frissítése zajlik. Kérjük türelmét.
                            </p>
                            <div className="flex items-center justify-center space-x-2 my-4">
                               <p className="text-lg font-medium text-slate-400">Betöltés</p>
                               <div className="loading-dots text-2xl font-bold text-red-400">
                                   <span>.</span><span>.</span><span>.</span>
                               </div>
                            </div>
                            <div className="mt-4 p-3 bg-slate-800/50 border border-slate-700 rounded-lg w-full">
                                <p className="text-sm text-slate-400">Várható éles indulás:</p>
                                <p className="text-lg font-bold text-cyan-300">Augusztus 4. 23:59</p>
                            </div>
                         </div>