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